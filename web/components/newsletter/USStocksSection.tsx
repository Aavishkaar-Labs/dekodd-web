'use client';

import { useState } from 'react';
import type { USStock } from '@/lib/newsletter/usStocks';

interface StockCardProps {
  stock: USStock;
}

function StockCard({ stock }: StockCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="stock-card"
      style={{ '--stock-color': stock.color } as React.CSSProperties}
      aria-expanded={expanded}
    >
      <div className="stock-card-inner" onClick={() => setExpanded(!expanded)}>
        <div className="stock-ticker-row">
          <div className="stock-ticker-badge" style={{ background: stock.color + '18', color: stock.color, borderColor: stock.color + '30' }}>
            {stock.ticker}
          </div>
          <span className="stock-exchange">{stock.exchange}</span>
          <button
            className="stock-expand"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <h3 className="stock-name">{stock.name}</h3>
        <p className="stock-sector">{stock.sector}</p>

        <div className="stock-metrics">
          <div className="stock-metric">
            <span className="stock-metric-val">{stock.marketCap}</span>
            <span className="stock-metric-label">Market Cap</span>
          </div>
          <div className="stock-metric">
            <span className="stock-metric-val">{stock.revenueGrowth}</span>
            <span className="stock-metric-label">Rev. Growth</span>
          </div>
          <div className="stock-metric">
            <span className="stock-metric-val">{stock.peRatio}</span>
            <span className="stock-metric-label">P/E</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="stock-body">
          <div className="stock-body-divider" style={{ background: stock.color + '30' }} />
          <p className="stock-why-label">Why we cover it</p>
          <p className="stock-why">{stock.whyWeCover}</p>
          <p className="stock-thesis-label">Investment thesis</p>
          <p className="stock-thesis">{stock.thesis}</p>
          <p className="stock-risks-label">Watch out for</p>
          <ul className="stock-risks">
            {stock.risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <div className="stock-tags">
            {stock.tags.map((t) => (
              <span key={t} className="stock-tag">{t}</span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

interface Props {
  stocks: USStock[];
}

export default function USStocksSection({ stocks }: Props) {
  return (
    <section className="nl-section nl-stocks-section" id="us-stocks">
      <div className="wrap">
        <div className="nl-section-header">
          <div className="section-eyebrow" style={{ color: 'var(--cyan-hi)' }}>
            <span style={{ background: 'var(--cyan-hi)' }} />
            US Stocks We Track
          </div>
          <h2 className="nl-section-h" style={{ color: 'var(--paper)' }}>
            Global giants,
            <br />
            <em className="nl-em" style={{ color: 'var(--cyan-hi)' }}>Indian context.</em>
          </h2>
          <p className="nl-section-sub" style={{ color: 'rgba(244,250,255,0.72)' }}>
            These companies matter to Indian investors — either because Indian funds hold them,
            or because they compete with or power India&apos;s tech sector.
          </p>
        </div>

        <div className="stock-grid">
          {stocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>

        <p className="nl-data-note" style={{ color: 'rgba(244,250,255,0.45)' }}>
          US market data is approximate. Not a recommendation to buy any security.
        </p>
      </div>
    </section>
  );
}
