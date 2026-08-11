'use client';

import { useState } from 'react';
import type { AgeStrategy } from '@/lib/newsletter/investmentStrategies';

const SIP_COLORS = {
  flexiCap: '#00d4ff',
  midCap: '#0099cc',
  smallCap: '#006688',
};

const CAP_LABELS = {
  flexiCap: 'Flexi Cap',
  midCap: 'Mid Cap',
  smallCap: 'Small Cap',
};

const CAP_DESCRIPTIONS = {
  flexiCap: 'Invests across company sizes. Fund manager moves between large, mid, and small cap as opportunities arise. Most stable of the three.',
  midCap: 'Medium-sized companies. Higher growth potential than large caps, lower risk than small caps. Sweet spot for most investors.',
  smallCap: 'Smaller companies with highest growth potential — but also highest volatility. Needs a long time horizon to smooth out swings.',
};

interface Props {
  strategies: AgeStrategy[];
}

export default function SIPAllocationSection({ strategies }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selected = strategies[selectedIndex];
  const { sipSplit } = selected;

  const segments = [
    { key: 'flexiCap' as const, value: sipSplit.flexiCap },
    { key: 'midCap' as const, value: sipSplit.midCap },
    { key: 'smallCap' as const, value: sipSplit.smallCap },
  ];

  return (
    <section className="nl-section nl-sip-section" id="sip-allocation">
      <div className="wrap">
        <div className="nl-section-header">
          <div className="section-eyebrow">SIP Allocation Guide</div>
          <h2 className="nl-section-h">
            Flexi, Mid, Small —
            <br />
            <em className="nl-em">how to split your SIP.</em>
          </h2>
          <p className="nl-section-sub">
            Most investors ask: &quot;Should I put more in mid cap or small cap?&quot; The right answer depends on
            your age and time horizon. Here&apos;s a framework.
          </p>
        </div>

        {/* Age picker */}
        <div className="sip-age-row">
          <span className="sip-age-prompt">My age range:</span>
          <div className="sip-tabs">
            {strategies.map((s, i) => (
              <button
                key={s.ageRange}
                onClick={() => setSelectedIndex(i)}
                className={`sip-tab ${i === selectedIndex ? 'sip-tab-active' : ''}`}
              >
                {s.ageRange}
              </button>
            ))}
          </div>
        </div>

        <div className="sip-panel">
          {/* Visual bars */}
          <div className="sip-bars-wrap">
            {segments.map(({ key, value }) => (
              <div key={key} className="sip-bar-col">
                <div className="sip-bar-outer">
                  <div
                    className="sip-bar-fill"
                    style={{
                      height: `${value}%`,
                      background: SIP_COLORS[key],
                    }}
                    role="img"
                    aria-label={`${CAP_LABELS[key]}: ${value}%`}
                  />
                </div>
                <div className="sip-bar-pct" style={{ color: SIP_COLORS[key] }}>
                  {value}%
                </div>
                <div className="sip-bar-label">{CAP_LABELS[key]}</div>
              </div>
            ))}
          </div>

          {/* Breakdown cards */}
          <div className="sip-breakdown">
            {segments.map(({ key, value }) => (
              <div key={key} className="sip-breakdown-card">
                <div className="sip-breakdown-header">
                  <div className="sip-breakdown-dot" style={{ background: SIP_COLORS[key] }} />
                  <span className="sip-breakdown-name">{CAP_LABELS[key]}</span>
                  <span className="sip-breakdown-pct" style={{ color: SIP_COLORS[key] }}>{value}%</span>
                </div>
                <p className="sip-breakdown-desc">{CAP_DESCRIPTIONS[key]}</p>
                <div className="sip-breakdown-example">
                  <span className="sip-example-label">Example on ₹10,000/mo SIP</span>
                  <span className="sip-example-val">₹{(value * 100).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sip-rationale">
            <span className="sip-rationale-icon">💡</span>
            <p>
              <strong>Why this split for {selected.ageRange}?</strong>{' '}
              {selected.ageRange === '18–25' && 'Maximum time horizon means volatility is your friend. Small cap has the highest long-term CAGR but needs 10+ years to shine.'}
              {selected.ageRange === '26–35' && 'Prime accumulation phase. Mid cap adds growth muscle to a flexi cap core — best of both worlds.'}
              {selected.ageRange === '36–45' && 'Goals are getting closer. Flexi cap acts as a shock absorber while you reduce small cap exposure.'}
              {selected.ageRange === '46–55' && 'Preservation mode. Flexi cap only — fund manager decides the size split, taking that decision off your plate.'}
              {selected.ageRange === '56+' && 'Minimal equity, and what remains goes into flexi cap so a professional manages the cap allocation dynamically.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
