'use client';

import { useState } from 'react';
import type { MutualFund } from '@/lib/newsletter/mutualFunds';

const RISK_COLOR: Record<MutualFund['risk'], string> = {
  Low: '#22c55e',
  Moderate: '#f59e0b',
  High: '#f97316',
  'Very High': '#ef4444',
};

const CATEGORY_SHORT: Record<string, string> = {
  'Flexi Cap': 'FLEXI',
  'Mid Cap': 'MID',
  'Small Cap': 'SMALL',
  'Large Cap': 'LARGE',
  ELSS: 'ELSS',
  Hybrid: 'HYBRID',
};

interface Props {
  fund: MutualFund;
  index: number;
}

export default function MutualFundCard({ fund, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="mf-card" aria-expanded={expanded}>
      <div className="mf-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="mf-card-left">
          <div className="mf-index">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div>
            <div className="mf-badges">
              <span className="mf-badge mf-badge-cat">
                {CATEGORY_SHORT[fund.category] ?? fund.category}
              </span>
              <span
                className="mf-badge mf-badge-risk"
                style={{ color: RISK_COLOR[fund.risk], borderColor: RISK_COLOR[fund.risk] + '40', background: RISK_COLOR[fund.risk] + '12' }}
              >
                {fund.risk} Risk
              </span>
            </div>
            <h3 className="mf-name">{fund.name}</h3>
            <p className="mf-house">{fund.house} · {fund.style}</p>
          </div>
        </div>
        <div className="mf-card-right">
          <div className="mf-metrics">
            <div className="mf-metric">
              <span className="mf-metric-val">{fund.cagr3y}</span>
              <span className="mf-metric-label">3Y CAGR</span>
            </div>
            <div className="mf-metric">
              <span className="mf-metric-val">{fund.cagr5y}</span>
              <span className="mf-metric-label">5Y CAGR</span>
            </div>
          </div>
          <button
            className="mf-expand-btn"
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mf-card-body">
          <div className="mf-body-grid">
            <div className="mf-body-main">
              <p className="mf-why-label">Why we cover it</p>
              <p className="mf-why-text">{fund.whyWeCover}</p>
              <p className="mf-thesis-label">Key thesis</p>
              <p className="mf-thesis-text">{fund.keyThesis}</p>
              <ul className="mf-highlights">
                {fund.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="mf-body-aside">
              <div className="mf-aside-row">
                <span className="mf-aside-label">AUM</span>
                <span className="mf-aside-val">{fund.aum}</span>
              </div>
              <div className="mf-aside-row">
                <span className="mf-aside-label">Expense Ratio</span>
                <span className="mf-aside-val">{fund.expenseRatio}</span>
              </div>
              <div className="mf-tags">
                {fund.tags.map((t) => (
                  <span key={t} className="mf-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
