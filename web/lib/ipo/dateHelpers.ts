import type { IPO } from './types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysFromNow(dateStr: string, now: Date): number {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / MS_PER_DAY);
}

export function formatShortDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * Computes a short, human copy line for an IPO card based on its current
 * status and schedule dates. Always derived live — nothing here is persisted.
 */
export function getDateIntelligence(ipo: IPO, now: Date = new Date()): string | undefined {
  const { schedule, status } = ipo;
  if (!schedule) return undefined;

  if (status === 'UPCOMING' && schedule.startDate) {
    const days = daysFromNow(schedule.startDate, now);
    if (days === 0) return 'Opens today';
    if (days === 1) return 'Opens tomorrow';
    if (days > 1) return `Opens in ${days} days`;
    return undefined; // start date in the past but still marked UPCOMING — inconsistent feed data, say nothing
  }

  if (status === 'OPEN' && schedule.endDate) {
    const days = daysFromNow(schedule.endDate, now);
    if (days === 0) return 'Closes today';
    if (days === 1) return 'Closes tomorrow';
    if (days > 1) return `Closes in ${days} days`;
    return 'Closing today';
  }

  if (status === 'CLOSED') {
    if (schedule.allotmentDate) {
      const days = daysFromNow(schedule.allotmentDate, now);
      if (days >= 0) {
        const short = formatShortDate(schedule.allotmentDate);
        return short ? `Allotment expected ${short}` : undefined;
      }
    }
    if (schedule.listingDate) {
      const short = formatShortDate(schedule.listingDate);
      return short ? `Lists ${short}` : undefined;
    }
  }

  return undefined;
}
