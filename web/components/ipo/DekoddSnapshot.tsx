import type { IPO } from '@/lib/ipo/types';
import { formatShortDate } from '@/lib/ipo/dateHelpers';

interface Props {
  ipo: IPO;
}

export default function DekoddSnapshot({ ipo }: Props) {
  const rows: { label: string; value: string }[] = [];

  if (ipo.issueSize?.totalCr) rows.push({ label: 'Issue Size', value: `₹${ipo.issueSize.totalCr.toLocaleString('en-IN')} Cr` });
  if (ipo.priceRange) {
    rows.push({
      label: 'Price Band',
      value: ipo.priceRange.min !== ipo.priceRange.max ? `₹${ipo.priceRange.min}–₹${ipo.priceRange.max}` : `₹${ipo.priceRange.max}`,
    });
  }
  if (ipo.gmp?.latest !== undefined) rows.push({ label: 'GMP', value: `₹${ipo.gmp.latest}` });
  if (ipo.subscription?.total?.times !== undefined) rows.push({ label: 'Subscription', value: `${ipo.subscription.total.times}x` });
  const listingLabel = formatShortDate(ipo.schedule?.listingDate);
  if (listingLabel) rows.push({ label: 'Listing', value: listingLabel });

  if (rows.length === 0) return null;

  return (
    <div className="ipo-snapshot">
      <h3 className="ipo-section-title">Dekodd Snapshot</h3>
      <div className="ipo-snapshot-grid">
        {rows.map((r) => (
          <div key={r.label} className="ipo-snapshot-row">
            <span>{r.label}</span>
            <span className="ipo-snapshot-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
