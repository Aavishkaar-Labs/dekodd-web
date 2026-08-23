import type { IPO } from '@/lib/ipo/types';
import { formatShortDate } from '@/lib/ipo/dateHelpers';

interface Props {
  ipo: IPO;
}

interface Milestone {
  label: string;
  date?: string;
}

export default function IPOTimeline({ ipo }: Props) {
  const { schedule } = ipo;
  if (!schedule) return null;

  const milestones: Milestone[] = [
    { label: 'IPO Opens', date: schedule.startDate },
    { label: 'IPO Closes', date: schedule.endDate },
    { label: 'Allotment', date: schedule.allotmentDate },
    { label: 'Refund', date: schedule.refundDate },
    { label: 'Shares Credited', date: schedule.shareCreditDate },
    { label: 'Listing', date: schedule.listingDate },
  ].filter((m) => m.date);

  if (milestones.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <ol className="ipo-timeline">
      {milestones.map((m) => {
        const d = new Date(m.date + 'T00:00:00');
        const state = d < today ? 'completed' : d.getTime() === today.getTime() ? 'current' : 'upcoming';
        return (
          <li key={m.label} className={`ipo-timeline-item ipo-timeline-${state}`}>
            <span className="ipo-timeline-dot" aria-hidden="true" />
            <span className="ipo-timeline-label">{m.label}</span>
            <span className="ipo-timeline-date">{formatShortDate(m.date)}</span>
          </li>
        );
      })}
    </ol>
  );
}
