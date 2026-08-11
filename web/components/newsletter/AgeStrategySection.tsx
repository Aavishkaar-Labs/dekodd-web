'use client';

import { useState } from 'react';
import type { AgeStrategy } from '@/lib/newsletter/investmentStrategies';

const ALLOCATION_COLORS = {
  equity: '#00d4ff',
  debt: '#0099cc',
  gold: '#f59e0b',
  international: '#8b5cf6',
};

const RISK_LABEL_COLOR: Record<string, string> = {
  Conservative: '#22c55e',
  Moderate: '#f59e0b',
  Aggressive: '#f97316',
  'Very Aggressive': '#ef4444',
};

interface AllocationBarProps {
  allocation: AgeStrategy['allocation'];
}

function AllocationBar({ allocation }: AllocationBarProps) {
  const segments = [
    { key: 'equity', label: 'Equity', value: allocation.equity, color: ALLOCATION_COLORS.equity },
    { key: 'debt', label: 'Debt', value: allocation.debt, color: ALLOCATION_COLORS.debt },
    { key: 'gold', label: 'Gold', value: allocation.gold, color: ALLOCATION_COLORS.gold },
    { key: 'international', label: 'International', value: allocation.international, color: ALLOCATION_COLORS.international },
  ];

  return (
    <div className="alloc-bar-wrap">
      <div className="alloc-bar" role="img" aria-label={`Asset allocation: Equity ${allocation.equity}%, Debt ${allocation.debt}%, Gold ${allocation.gold}%, International ${allocation.international}%`}>
        {segments.map((s) => (
          <div
            key={s.key}
            className="alloc-bar-seg"
            style={{ width: `${s.value}%`, background: s.color }}
            title={`${s.label}: ${s.value}%`}
          />
        ))}
      </div>
      <div className="alloc-legend">
        {segments.map((s) => (
          <div key={s.key} className="alloc-legend-item">
            <span className="alloc-dot" style={{ background: s.color }} />
            <span className="alloc-legend-label">{s.label}</span>
            <span className="alloc-legend-val">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  strategies: AgeStrategy[];
}

export default function AgeStrategySection({ strategies }: Props) {
  const [activeIndex, setActiveIndex] = useState(1); // default 26-35
  const active = strategies[activeIndex];

  return (
    <section className="nl-section nl-age-section" id="age-strategy">
      <div className="wrap">
        <div className="nl-section-header">
          <div className="section-eyebrow">Invest By Age</div>
          <h2 className="nl-section-h">
            The right strategy
            <br />
            <em className="nl-em">for where you are.</em>
          </h2>
          <p className="nl-section-sub">
            No single strategy fits everyone. Select your age range and see what a sensible approach looks like —
            built from first principles, not copy-pasted from a brochure.
          </p>
        </div>

        {/* Age Selector */}
        <div className="age-selector" role="tablist" aria-label="Select age range">
          {strategies.map((s, i) => (
            <button
              key={s.ageRange}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={`age-tab ${i === activeIndex ? 'age-tab-active' : ''}`}
            >
              {s.ageRange}
            </button>
          ))}
        </div>

        {/* Strategy Panel */}
        <div className="age-panel" role="tabpanel" key={active.ageRange}>
          <div className="age-panel-header">
            <div>
              <p className="age-panel-label">{active.label}</p>
              <h3 className="age-panel-tagline">{active.tagline}</h3>
            </div>
            <div className="age-panel-badges">
              <span
                className="age-risk-badge"
                style={{
                  color: RISK_LABEL_COLOR[active.riskProfile],
                  borderColor: RISK_LABEL_COLOR[active.riskProfile] + '40',
                  background: RISK_LABEL_COLOR[active.riskProfile] + '12',
                }}
              >
                {active.riskProfile}
              </span>
              <span className="age-horizon-badge">{active.horizon}</span>
            </div>
          </div>

          <div className="age-panel-grid">
            <div className="age-panel-left">
              <AllocationBar allocation={active.allocation} />

              <div className="age-income-row">
                <div className="age-income-item">
                  <span className="age-income-label">Typical income</span>
                  <span className="age-income-val">{active.monthlyIncome}</span>
                </div>
                <div className="age-income-item">
                  <span className="age-income-label">Recommended SIP</span>
                  <span className="age-income-val">{active.recommendedSip}</span>
                </div>
              </div>

              <div className="age-bestfor">
                <span className="age-bestfor-label">Best for</span>
                <p>{active.bestFor}</p>
              </div>
              <div className="age-watchout">
                <span className="age-watchout-label">⚠ Watch out</span>
                <p>{active.watchOut}</p>
              </div>
            </div>

            <div className="age-panel-right">
              <p className="age-principles-label">Core principles</p>
              <ul className="age-principles">
                {active.keyPrinciples.map((p, i) => (
                  <li key={i}>
                    <span className="age-principle-num">{String(i + 1).padStart(2, '0')}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
