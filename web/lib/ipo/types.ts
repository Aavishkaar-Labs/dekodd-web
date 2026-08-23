/**
 * Dekodd IPO Tracker — canonical model
 *
 * This is the shape every component and API route consumes. Nothing outside
 * lib/ipo/finApiProvider.ts should ever see FinAPI's raw response — if we
 * swap providers later, only the provider file changes.
 *
 * Verified against a live call to FinAPI (Aug 2026):
 *   GET https://finapi.upvaly.com/api/ipo
 * No auth required. No pagination. No server-side filtering (a
 * ?status=upcoming query param was silently ignored). Every request
 * returns the full current dataset, so Dekodd's API layer does the
 * status/search filtering itself.
 */

export type IPOType = 'MAINBOARD' | 'SME' | string;

export type IPOStatus = 'UPCOMING' | 'OPEN' | 'CLOSED';
// Normalized from FinAPI's "UPCOMING" | "LIVE" | "CLOSED".
// No "LISTED" status has been observed in the feed — IPOs may simply drop
// off, or listed IPOs may not be included at all. Unconfirmed; the UI
// should not assume a LISTED state is reachable.

export interface PriceRange {
  min?: number;
  max?: number;
  /** Original string, kept because some entries are unpriced ("–") or single-value ("₹115"). */
  raw: string;
}

export interface IssueSize {
  totalCr?: number;
  freshIssueCr?: number;
  offerForSaleCr?: number;
}

export interface IPOSchedule {
  startDate?: string;
  endDate?: string;
  listingDate?: string;
  allotmentDate?: string;
  refundDate?: string;
  shareCreditDate?: string;
}

export interface GMPTrendPoint {
  date: string;
  gmp: number;
  gainPct?: number;
}

export interface GMPInfo {
  /** Derived from the most recent entry in gmpTrends. */
  latest?: number;
  latestGainPct?: number;
  lastUpdated?: string;
  trend?: GMPTrendPoint[];
  /** FinAPI attributes GMP to ipowatch.in, not its own data — always show this as the source. */
  sourceUrl?: string;
}

export interface SubscriptionCategory {
  reservedCr?: number;
  appliedCr?: number;
  times?: number;
}

export interface SubscriptionInfo {
  institutional?: SubscriptionCategory;
  nii?: SubscriptionCategory;
  retail?: SubscriptionCategory;
  total?: SubscriptionCategory;
}

export interface IPO {
  /** = symbol. Used as the [symbol] route param. */
  id: string;
  symbol: string;
  name: string;
  logoUrl?: string;
  type?: IPOType;
  status: IPOStatus;

  priceRange?: PriceRange;
  lotSize?: number;
  issueSize?: IssueSize;
  schedule?: IPOSchedule;

  aboutCompany?: string;
  strengths?: string[];
  risks?: string[];
  drhpLink?: string;
  rhpLink?: string;

  gmp?: GMPInfo;
  subscription?: SubscriptionInfo;
  exchanges?: string;

  /** Safely derived: priceRange.max * lotSize, when both are available. Never fabricated otherwise. */
  minimumInvestment?: number;

  source: 'FINAPI';
}
