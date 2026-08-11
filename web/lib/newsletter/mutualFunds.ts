/**
 * Newsletter — Indian Mutual Fund Data
 *
 * DATA SOURCES & DATES (as of 11 Aug 2026):
 *
 * All 5 funds: Direct Plan – Growth variant only.
 * Returns are point-to-point CAGR (lumpsum), NOT SIP returns or rolling returns.
 * Sources: Value Research Online (primary), Dhan, Zerodha Coin, INDmoney (cross-check).
 * NAVs sourced from AMFI / Value Research as of 11-Aug-2026 where available.
 *
 * CAGR data-date note:
 * ─ PPFAS Flexi Cap: returns as of 11-Aug-2026 (Value Research / Zerodha Coin)
 * ─ HDFC Flexi Cap: returns as of 11-Aug-2026 (Value Research)
 * ─ Invesco India Midcap: returns as of 07-Aug-2026 (Dhan / INDmoney)
 * ─ Bandhan Small Cap: returns as of 10-Aug-2026 (Value Research / Dhan)
 * ─ Motilal Oswal Midcap: returns as of 10-Aug-2026 (Dhan)
 *
 * AUM figures are the latest monthly AUM disclosed by AMCs (July 2026 data,
 * published in early August 2026) — standard SEBI reporting cycle.
 *
 * TO MAKE DYNAMIC: replace the static export below with:
 *   export async function getMutualFunds(): Promise<MutualFund[]> {
 *     return fetch('/api/newsletter/funds').then(r => r.json());
 *   }
 */

export interface MutualFund {
  id: string;
  name: string;
  house: string;
  category: 'Flexi Cap' | 'Mid Cap' | 'Small Cap' | 'Large Cap' | 'ELSS' | 'Hybrid';
  risk: 'Low' | 'Moderate' | 'High' | 'Very High';
  style: string;
  /** Latest NAV (Direct – Growth plan), formatted as ₹ string */
  nav: string;
  /** NAV date (ISO 8601) */
  navDate: string;
  /** AUM in ₹ Crore, formatted string */
  aum: string;
  /** Direct-plan expense ratio */
  expenseRatio: string;
  /** 3-year point-to-point CAGR, Direct Growth plan */
  cagr3y: string;
  /** 5-year point-to-point CAGR, Direct Growth plan */
  cagr5y: string;
  /** Benchmark index name */
  benchmark: string;
  whyWeCover: string;
  keyThesis: string;
  highlights: string[];
  tags: string[];
}

export const mutualFunds: MutualFund[] = [
  // ─────────────────────────────────────────────────────────────────────
  // 1. Parag Parikh Flexi Cap Fund – Direct Growth
  //    Source: Value Research Online / Zerodha Coin / Dhan (11-Aug-2026)
  //    NAV ₹92.4138 — Value Research (11-Aug-2026)
  //    3Y CAGR 14.9% — Zerodha Coin; cross-checked Dhan (14.76%), INDmoney (14.9%)
  //    5Y CAGR 13.7% — Zerodha Coin; cross-checked Dhan (13.59%), VR (13.7%)
  //    AUM ₹1,43,388 Cr — Value Research / Dhan (Jul 2026 disclosure)
  //    Expense ratio 0.52% — Value Research (11-Aug-2026)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'ppfas-flexi',
    name: 'Parag Parikh Flexi Cap Fund – Direct Growth',
    house: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    style: 'Value + International',
    nav: '₹92.41',
    navDate: '2026-08-11',
    aum: '₹1,43,388 Cr',
    expenseRatio: '0.52%',
    cagr3y: '14.9%',
    cagr5y: '13.7%',
    benchmark: 'Nifty 500 TRI',
    whyWeCover:
      'The most honest fund in India. No churn, no gimmicks — and they hold international stocks when most funds can\'t.',
    keyThesis:
      'Long-only, low-turnover portfolio with ~20% in global giants like Alphabet and Meta. Rare combination of concentration and discipline.',
    highlights: [
      'Portfolio managers invest their own money in the fund — skin in the game',
      'International allocation (Alphabet, Meta, Microsoft) provides USD exposure and diversification',
      'Benchmark-beating 10-year track record despite recent underperformance vs peers in bull run',
    ],
    tags: ['Value investing', 'Global diversification', 'Low churn'],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 2. HDFC Flexi Cap Fund – Direct Growth
  //    Source: Value Research Online / Dhan (11-Aug-2026)
  //    NAV ₹2,298.07 — Value Research / Dhan (11-Aug-2026)
  //    3Y CAGR 17.79% — Dhan (10-Aug-2026); VR shows ~18.97% over 5Y
  //    5Y CAGR 18.97% — Value Research (11-Aug-2026)
  //    AUM ₹1,10,736 Cr — Value Research / Dhan (Jul 2026 disclosure)
  //    Expense ratio 0.55% — Value Research (11-Aug-2026)
  //    Note: Dhan expense ratio field shows 0.75%; VR Direct plan shows 0.55%.
  //    We prefer Value Research's direct-plan figure.
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'hdfc-flexi',
    name: 'HDFC Flexi Cap Fund – Direct Growth',
    house: 'HDFC Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    style: 'Large-cap Biased Multi-cap',
    nav: '₹2,298.07',
    navDate: '2026-08-11',
    aum: '₹1,10,736 Cr',
    expenseRatio: '0.55%',
    cagr3y: '17.79%',
    cagr5y: '18.97%',
    benchmark: 'Nifty 500 TRI',
    whyWeCover:
      'One of India\'s oldest and most trusted equity funds — launched 1995 and still compounding steadily.',
    keyThesis:
      'Large-cap backbone (~75–80%) with selective mid-cap additions. Fund manager Amit Ganatra leans on quality earnings growth and avoids momentum traps.',
    highlights: [
      'CRISIL top-30-percentile ranking for 3 consecutive quarters through Mar 2024',
      'Outperformed Nifty 500 TRI over 1Y, 3Y, 5Y, 7Y, and 10Y trailing periods',
      'Among the lowest drawdowns in the flexi-cap category during 2022 correction',
    ],
    tags: ['Large cap bias', 'Long track record', 'Quality growth'],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3. Invesco India Midcap Fund – Direct Growth
  //    Source: Dhan / INDmoney (07-Aug-2026)
  //    NAV ₹243.34 — Dhan / Paytm Money (07-Aug-2026)
  //    3Y CAGR 26.22% — Dhan (06-Aug-2026); cross-check: INDmoney 25.46%,
  //             5paisa 26.13% — using Dhan figure as primary
  //    5Y CAGR 21.04% — Dhan (06-Aug-2026); cross-check: INDmoney 20.57%,
  //             5paisa 21.03% — consistent across sources
  //    AUM ₹13,767 Cr — Dhan / INDmoney (Jul 2026 disclosure)
  //    Expense ratio 0.49% — Dhan (06-Aug-2026)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'invesco-midcap',
    name: 'Invesco India Midcap Fund – Direct Growth',
    house: 'Invesco Mutual Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    style: 'Quality Growth (GARP)',
    nav: '₹243.34',
    navDate: '2026-08-07',
    aum: '₹13,767 Cr',
    expenseRatio: '0.49%',
    cagr3y: '26.22%',
    cagr5y: '21.04%',
    benchmark: 'BSE 150 MidCap TRI',
    whyWeCover:
      'Consistently outperforms the mid-cap benchmark with one of the lowest expense ratios in the category.',
    keyThesis:
      'Fund manager Aditya Khemani concentrates in 50–65 high-conviction midcap names. Real estate (Prestige), financials (Federal Bank), and tech (BSE Ltd) form the current core.',
    highlights: [
      'Ranked 8/25 mid-cap funds by INDmoney — top third of category',
      'Outperforms Nifty Midcap 150 consistently over 1Y, 3Y, 5Y periods',
      'Expense ratio 0.49% — among the cheapest actively managed mid-cap funds',
    ],
    tags: ['Mid cap', 'Low cost', 'High conviction'],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 4. Bandhan Small Cap Fund – Direct Growth
  //    Source: Value Research Online / Dhan / INDmoney (10-Aug-2026)
  //    NAV ₹57.00 — Value Research (10-Aug-2026); Dhan ₹56.875 (05-Aug)
  //    3Y CAGR 27.67% — Dhan (05-Aug-2026); cross-check: INDmoney 28.02%
  //             — using Dhan figure as primary (slightly conservative)
  //    5Y CAGR 20.12% — Value Research (10-Aug-2026); Dhan 20.01%, INDmoney 20.14%
  //    AUM ₹28,466 Cr — Value Research / Dhan (Jul 2026 disclosure)
  //    Expense ratio 0.33% — Value Research (11-Aug-2026); Dhan shows 0.35%
  //    Note: Bandhan Small Cap was launched Feb 2020 — 5Y CAGR is from inception
  //    effectively (fund is ~6 years old). Past returns since launch: ~30.99% CAGR.
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'bandhan-smallcap',
    name: 'Bandhan Small Cap Fund – Direct Growth',
    house: 'Bandhan Mutual Fund',
    category: 'Small Cap',
    risk: 'Very High',
    style: 'GARP — Quality at Reasonable Price',
    nav: '₹57.00',
    navDate: '2026-08-10',
    aum: '₹28,466 Cr',
    expenseRatio: '0.33%',
    cagr3y: '27.67%',
    cagr5y: '20.12%',
    benchmark: 'BSE 250 SmallCap TRI',
    whyWeCover:
      'INDmoney\'s #1 ranked small-cap fund (1 of 22). Lowest expense ratio in the category, and a disciplined GARP stock-picking process.',
    keyThesis:
      'Managed by Manish Gunwani (ex-Nippon India), the fund avoids concentration risk — no single stock dominates. Diversified across 100+ small caps across financial services, real estate, and consumer sectors.',
    highlights: [
      'Ranked #1 out of 22 small-cap funds by INDmoney as of Aug 2026',
      'Expense ratio 0.33% — category-leading low cost',
      'Launched Feb 2020 — has navigated both COVID crash and bull run since inception',
    ],
    tags: ['Small cap', 'Low cost', 'Diversified', 'GARP'],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 5. Motilal Oswal Midcap Fund – Direct Growth
  //    Source: Dhan / Dezerv / Angel One (10-Aug-2026)
  //    NAV ₹119.58 — Dhan (10-Aug-2026); Dezerv ₹117.60 (03-Aug)
  //    3Y CAGR 20.60% — Dhan (10-Aug-2026); cross-check: Dezerv 21.29%,
  //             Angel One "21.29% over 3 years" — Dhan figure as of later date
  //    5Y CAGR 23.26% — Dhan (10-Aug-2026)
  //    AUM ₹40,036 Cr — Dhan (Jul 2026 disclosure)
  //    Expense ratio 0.98% — Dhan / Angel One / Dezerv (consistent across sources)
  //    Note: Higher expense ratio than peers — justified by concentrated 25-stock
  //    portfolio approach and strong 5Y track record.
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'motilal-midcap',
    name: 'Motilal Oswal Midcap Fund – Direct Growth',
    house: 'Motilal Oswal Mutual Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    style: 'High Conviction Concentrated',
    nav: '₹119.58',
    navDate: '2026-08-10',
    aum: '₹40,036 Cr',
    expenseRatio: '0.98%',
    cagr3y: '20.60%',
    cagr5y: '23.26%',
    benchmark: 'Nifty Midcap 150 TRI',
    whyWeCover:
      'The highest-conviction mid-cap fund in India — invests in maximum 25–30 companies, only in businesses with durable competitive advantages.',
    keyThesis:
      'QGLP framework: Quality, Growth, Longevity, Price. Every holding must be a market leader in its niche. The ultra-concentrated approach amplifies both alpha and volatility.',
    highlights: [
      '5Y CAGR of 23.26% — top-tier among all mid-cap funds over this period',
      'AUM grown from ₹1,895 Cr (Mar 2021) to ₹40,000+ Cr (Aug 2026) — 20x in 5 years',
      'CRISIL top-30-percentile for multiple consecutive quarters through 2024',
    ],
    tags: ['Concentrated portfolio', 'Mid cap', 'High conviction', 'QGLP'],
  },
];
