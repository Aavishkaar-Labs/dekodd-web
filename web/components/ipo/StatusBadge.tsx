import type { IPOStatus } from '@/lib/ipo/types';

const LABEL: Record<IPOStatus, string> = {
  UPCOMING: 'Upcoming',
  OPEN: 'Open',
  CLOSED: 'Closed',
};

interface Props {
  status: IPOStatus;
}

export default function StatusBadge({ status }: Props) {
  return <span className={`ipo-status-badge ipo-status-${status.toLowerCase()}`}>{LABEL[status]}</span>;
}
