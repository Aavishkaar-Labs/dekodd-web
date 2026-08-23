/**
 * FinAPI returns numeric data as loosely-formatted strings, and not
 * consistently: issueSize.freshIssue is sometimes "60.98" and sometimes
 * "₹2100 crores". These parsers are defensive by design — malformed or
 * unexpected input returns undefined rather than NaN or a thrown error,
 * so one bad field never breaks the whole IPO card.
 */

import type { PriceRange } from './types';

function toNumber(raw: string): number | undefined {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

/** "₹142 – ₹151" | "₹115" | "–" | null | undefined → PriceRange | undefined */
export function parsePriceRange(raw?: string | null): PriceRange | undefined {
  if (!raw || raw.trim() === '' || raw.trim() === '–' || raw.trim() === '-') return undefined;

  // en dash or hyphen between two values
  const parts = raw.split(/[–-]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const min = toNumber(parts[0]);
    const max = toNumber(parts[parts.length - 1]);
    if (min !== undefined || max !== undefined) {
      return { min, max, raw };
    }
    return undefined;
  }

  const single = toNumber(raw);
  if (single === undefined) return undefined;
  return { min: single, max: single, raw };
}

/** "60.98" | "₹2100 crores" | "₹1568.13 crores" | null | undefined → number (in ₹ Cr) | undefined */
export function parseCr(raw?: string | null): number | undefined {
  if (!raw) return undefined;
  return toNumber(raw);
}

/** "7.35x" | "0x" | "-%"/"0x" edge cases | null | undefined → number | undefined */
export function parseTimes(raw?: string | null): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/x$/i, '').trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

/** "1000" | null | undefined → number | undefined */
export function parseIntSafe(raw?: string | null): number | undefined {
  if (!raw) return undefined;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

/** "15.91%" | "-%" | null | undefined → number | undefined */
export function parsePercent(raw?: string | null): number | undefined {
  if (!raw || raw.trim() === '-%') return undefined;
  const n = toNumber(raw);
  return n;
}
