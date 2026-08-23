import type { IPO, IPOStatus, GMPTrendPoint } from './types';
import { parsePriceRange, parseCr, parseTimes, parseIntSafe, parsePercent } from './money';

const FINAPI_URL = 'https://finapi.upvaly.com/api/ipo';

// FinAPI has no pagination and (as far as we've observed) no server-side
// filtering — every call returns the full current dataset. Caching this for
// 30 minutes means the list page, the detail page, and repeat visitors all
// share one upstream call per window instead of one per request.
const CACHE_SECONDS = 30 * 60;

export class IPOProviderError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'IPOProviderError';
  }
}

function normalizeStatus(raw: unknown): IPOStatus | undefined {
  if (typeof raw !== 'string') return undefined;
  const s = raw.toUpperCase();
  if (s === 'LIVE') return 'OPEN';
  if (s === 'UPCOMING') return 'UPCOMING';
  if (s === 'CLOSED') return 'CLOSED';
  return undefined;
}

function normalizeType(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const s = raw.toUpperCase();
  if (s === 'MAINBOARD') return 'MAINBOARD';
  if (s === 'SME') return 'SME';
  return raw; // pass through unusual values (e.g. "SSE") rather than dropping them
}

function normalizeGmp(raw: unknown): IPO['gmp'] {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Record<string, unknown>;
  const trendsRaw = Array.isArray(r.gmpTrends) ? r.gmpTrends : [];

  const trend: GMPTrendPoint[] = trendsRaw
    .map((point): GMPTrendPoint | undefined => {
      if (!point || typeof point !== 'object') return undefined;
      const p = point as Record<string, unknown>;
      const gmp = typeof p.gmp === 'string' ? parseCr(p.gmp) : undefined;
      const date = typeof p.date === 'string' ? p.date : undefined;
      if (gmp === undefined || !date) return undefined;
      return {
        date,
        gmp,
        gainPct: typeof p.gain === 'string' ? parsePercent(p.gain) : undefined,
      };
    })
    .filter((p): p is GMPTrendPoint => p !== undefined);

  const latestPoint = trend[0];

  return {
    latest: latestPoint?.gmp,
    latestGainPct: latestPoint?.gainPct,
    lastUpdated: latestPoint?.date,
    trend: trend.length > 0 ? trend : undefined,
    sourceUrl: typeof r.gmpSource === 'string' ? r.gmpSource : undefined,
  };
}

function normalizeSubCategory(raw: unknown) {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Record<string, unknown>;
  return {
    reservedCr: typeof r.reserved === 'string' ? parseCr(r.reserved) : undefined,
    appliedCr: typeof r.applied === 'string' ? parseCr(r.applied) : undefined,
    times: typeof r.subscription === 'string' ? parseTimes(r.subscription) : undefined,
  };
}

function normalizeSubscription(raw: unknown): IPO['subscription'] {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Record<string, unknown>;
  const sub = {
    institutional: normalizeSubCategory(r.institutional),
    nii: normalizeSubCategory(r.nii),
    retail: normalizeSubCategory(r.retail),
    total: normalizeSubCategory(r.total),
  };
  const hasAny = Object.values(sub).some((v) => v !== undefined);
  return hasAny ? sub : undefined;
}

/**
 * Normalizes one raw FinAPI IPO object into Dekodd's canonical model.
 * Defensive throughout — unexpected shapes degrade to `undefined` fields
 * rather than throwing, so one malformed IPO never breaks the whole list.
 */
export function normalizeIpo(raw: unknown): IPO | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Record<string, unknown>;

  const symbol = typeof r.symbol === 'string' ? r.symbol : undefined;
  const name = typeof r.name === 'string' ? r.name : undefined;
  const status = normalizeStatus(r.status);
  if (!symbol || !name || !status) return undefined; // these three are non-negotiable for a usable card

  const priceRange = typeof r.priceRange === 'string' ? parsePriceRange(r.priceRange) : undefined;
  const lotSize = typeof r.lotSize === 'string' ? parseIntSafe(r.lotSize) : undefined;

  const scheduleRaw = r.schedule && typeof r.schedule === 'object' ? (r.schedule as Record<string, unknown>) : undefined;
  const schedule = scheduleRaw
    ? {
        startDate: typeof scheduleRaw.startDate === 'string' ? scheduleRaw.startDate : undefined,
        endDate: typeof scheduleRaw.endDate === 'string' ? scheduleRaw.endDate : undefined,
        listingDate: typeof scheduleRaw.listingDate === 'string' ? scheduleRaw.listingDate : undefined,
        allotmentDate: typeof scheduleRaw.allotmentFinalization === 'string' ? scheduleRaw.allotmentFinalization : undefined,
        refundDate: typeof scheduleRaw.refundInitiation === 'string' ? scheduleRaw.refundInitiation : undefined,
        shareCreditDate: typeof scheduleRaw.shareCredit === 'string' ? scheduleRaw.shareCredit : undefined,
      }
    : undefined;

  const issueSizeRaw = r.issueSize && typeof r.issueSize === 'object' ? (r.issueSize as Record<string, unknown>) : undefined;
  const issueSize = issueSizeRaw
    ? {
        totalCr: typeof issueSizeRaw.totalIssueSize === 'string' ? parseCr(issueSizeRaw.totalIssueSize) : undefined,
        freshIssueCr: typeof issueSizeRaw.freshIssue === 'string' ? parseCr(issueSizeRaw.freshIssue) : undefined,
        offerForSaleCr: typeof issueSizeRaw.offerForSale === 'string' ? parseCr(issueSizeRaw.offerForSale) : undefined,
      }
    : undefined;

  const minimumInvestment =
    priceRange?.max !== undefined && lotSize !== undefined ? priceRange.max * lotSize : undefined;

  return {
    id: symbol,
    symbol,
    name,
    logoUrl: typeof r.logoUrl === 'string' ? r.logoUrl : undefined,
    type: normalizeType(r.type),
    status,
    priceRange,
    lotSize,
    issueSize,
    schedule,
    aboutCompany: typeof r.aboutCompany === 'string' ? r.aboutCompany : undefined,
    strengths: Array.isArray(r.strengths) ? r.strengths.filter((s): s is string => typeof s === 'string') : undefined,
    risks: Array.isArray(r.risks) ? r.risks.filter((s): s is string => typeof s === 'string') : undefined,
    drhpLink: typeof r.drhpLink === 'string' ? r.drhpLink : undefined,
    rhpLink: typeof r.rhpLink === 'string' && r.rhpLink !== '#' ? r.rhpLink : undefined,
    gmp: normalizeGmp(r.greyMarketPremium),
    subscription: normalizeSubscription(r.subscriptionNumbers),
    exchanges: typeof r.exchanges === 'string' ? r.exchanges : undefined,
    minimumInvestment,
    source: 'FINAPI',
  };
}

async function fetchRaw(): Promise<unknown[]> {
  let res: Response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      res = await fetch(FINAPI_URL, {
        next: { revalidate: CACHE_SECONDS },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    throw new IPOProviderError('IPO data source is unreachable.', err);
  }

  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After');
    throw new IPOProviderError(`IPO data source is rate-limited.${retryAfter ? ` Retry after ${retryAfter}s.` : ''}`);
  }
  if (!res.ok) {
    throw new IPOProviderError(`IPO data source returned ${res.status}.`);
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch (err) {
    throw new IPOProviderError('IPO data source returned a malformed response.', err);
  }

  const data = (json as Record<string, unknown> | null)?.data;
  if (!Array.isArray(data)) {
    throw new IPOProviderError('IPO data source returned an unexpected shape.');
  }
  return data;
}

/** Fetches and normalizes the full IPO list. Malformed individual entries are skipped, not fatal. */
export async function getAllIpos(): Promise<IPO[]> {
  const raw = await fetchRaw();
  return raw.map(normalizeIpo).filter((ipo): ipo is IPO => ipo !== undefined);
}

export async function getIpoBySymbol(symbol: string): Promise<IPO | null> {
  const all = await getAllIpos();
  return all.find((ipo) => ipo.symbol.toLowerCase() === symbol.toLowerCase()) ?? null;
}
