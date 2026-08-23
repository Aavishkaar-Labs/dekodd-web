import Image from 'next/image';
import Link from 'next/link';
import type { IPO } from '@/lib/ipo/types';
import { getDateIntelligence, formatShortDate } from '@/lib/ipo/dateHelpers';
import StatusBadge from './StatusBadge';

interface Props {
  ipo: IPO;
}

export default function IPOCard({ ipo }: Props) {
  const dateNote = getDateIntelligence(ipo);
  const priceLabel = ipo.priceRange
    ? ipo.priceRange.min !== ipo.priceRange.max
      ? `₹${ipo.priceRange.min} – ₹${ipo.priceRange.max}`
      : `₹${ipo.priceRange.max}`
    : '—';

  return (
    <Link href={`/ipos/${ipo.symbol}`} className="ipo-card">
      <div className="ipo-card-top">
        <div className="ipo-card-identity">
          {ipo.logoUrl ? (
            <Image src={ipo.logoUrl} alt="" width={40} height={40} className="ipo-card-logo" unoptimized />
          ) : (
            <div className="ipo-card-logo ipo-card-logo-fallback" aria-hidden="true">
              {ipo.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="ipo-card-name">{ipo.name}</h3>
            <div className="ipo-card-badges">
              {ipo.type && <span className="ipo-type-badge">{ipo.type}</span>}
              <StatusBadge status={ipo.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="ipo-card-metrics">
        <div className="ipo-card-metric">
          <span className="ipo-card-metric-label">Price Band</span>
          <span className="ipo-card-metric-val">{priceLabel}</span>
        </div>
        <div className="ipo-card-metric">
          <span className="ipo-card-metric-label">Issue Size</span>
          <span className="ipo-card-metric-val">
            {ipo.issueSize?.totalCr ? `₹${ipo.issueSize.totalCr.toLocaleString('en-IN')} Cr` : '—'}
          </span>
        </div>
        <div className="ipo-card-metric">
          <span className="ipo-card-metric-label">{ipo.status === 'UPCOMING' ? 'Opens' : 'Closes'}</span>
          <span className="ipo-card-metric-val">
            {formatShortDate(ipo.status === 'UPCOMING' ? ipo.schedule?.startDate : ipo.schedule?.endDate) ?? '—'}
          </span>
        </div>
        <div className="ipo-card-metric">
          <span className="ipo-card-metric-label">Listing</span>
          <span className="ipo-card-metric-val">{formatShortDate(ipo.schedule?.listingDate) ?? '—'}</span>
        </div>
      </div>

      {dateNote && <div className="ipo-card-note">{dateNote}</div>}

      <div className="ipo-card-cta">
        View IPO
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </Link>
  );
}
