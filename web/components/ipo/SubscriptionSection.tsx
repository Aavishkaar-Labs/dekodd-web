import type { IPO } from '@/lib/ipo/types';

interface Props {
  ipo: IPO;
}

const ROWS: { key: 'institutional' | 'nii' | 'retail' | 'total'; label: string }[] = [
  { key: 'institutional', label: 'QIB' },
  { key: 'nii', label: 'NII' },
  { key: 'retail', label: 'Retail' },
  { key: 'total', label: 'Total' },
];

export default function SubscriptionSection({ ipo }: Props) {
  const { subscription } = ipo;
  if (!subscription) return null;

  const rows = ROWS.filter((r) => subscription[r.key]?.times !== undefined);
  if (rows.length === 0) return null;

  return (
    <div className="ipo-sub-section">
      <h3 className="ipo-section-title">IPO Subscription</h3>
      <div className="ipo-sub-grid">
        {rows.map((r) => (
          <div key={r.key} className={`ipo-sub-row ${r.key === 'total' ? 'ipo-sub-row-total' : ''}`}>
            <span>{r.label}</span>
            <span className="ipo-sub-val">{subscription[r.key]?.times}x</span>
          </div>
        ))}
      </div>
    </div>
  );
}
