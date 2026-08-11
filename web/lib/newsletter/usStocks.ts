export interface USStock {
  id: string;
  name: string;
  ticker: string;
  exchange: 'NYSE' | 'NASDAQ';
  sector: string;
  marketCap: string;
  peRatio: string;
  revenue: string;
  revenueGrowth: string;
  thesis: string;
  whyWeCover: string;
  risks: string[];
  tags: string[];
  color: string;
}

export const usStocks: USStock[] = [
  {
    id: 'nvda',
    name: 'NVIDIA',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    sector: 'Semiconductors',
    marketCap: '$2.8T',
    peRatio: '38x',
    revenue: '$88B TTM',
    revenueGrowth: '+122% YoY',
    thesis: 'The picks-and-shovels play on AI. Every major AI model trains on NVIDIA GPUs. Data center revenue now dwarfs gaming.',
    whyWeCover: 'Most relevant global company to India\'s tech sector — Indian IT firms bill their AI work on NVIDIA infrastructure.',
    risks: ['China export restrictions could hit 15-20% of revenue', 'AMD and custom silicon are credible alternatives now', 'Valuation prices in 5 years of hyper-growth'],
    tags: ['AI infrastructure', 'Semiconductors', 'Data center'],
    color: '#76b900',
  },
  {
    id: 'googl',
    name: 'Alphabet',
    ticker: 'GOOGL',
    exchange: 'NASDAQ',
    sector: 'Technology',
    marketCap: '$2.1T',
    peRatio: '22x',
    revenue: '$340B TTM',
    revenueGrowth: '+14% YoY',
    thesis: 'Undervalued relative to AI peers. Search + YouTube + Cloud form a durable moat. Gemini integration is the sleeper story.',
    whyWeCover: 'PPFAS Flexi Cap holds Alphabet — understanding this stock directly explains a major Indian fund holding.',
    risks: ['DOJ antitrust case could force Chrome divestiture', 'AI chatbots threatening search market share', 'Regulatory headwinds in EU'],
    tags: ['Search monopoly', 'Cloud', 'AI integration'],
    color: '#4285f4',
  },
  {
    id: 'msft',
    name: 'Microsoft',
    ticker: 'MSFT',
    exchange: 'NASDAQ',
    sector: 'Technology',
    marketCap: '$3.1T',
    peRatio: '35x',
    revenue: '$245B TTM',
    revenueGrowth: '+17% YoY',
    thesis: 'Azure + Copilot is the most compelling B2B AI monetization story. 300M+ Office users are the distribution flywheel.',
    whyWeCover: 'Several Indian funds now hold MSFT via international fund-of-funds. Critical for understanding global tech allocation.',
    risks: ['Azure growth decelerating vs AWS', 'OpenAI dependency is a concentration risk', 'Premium valuation in a risk-off market'],
    tags: ['Enterprise software', 'Cloud', 'AI Copilot'],
    color: '#00a4ef',
  },
  {
    id: 'amzn',
    name: 'Amazon',
    ticker: 'AMZN',
    exchange: 'NASDAQ',
    sector: 'E-commerce / Cloud',
    marketCap: '$2.2T',
    peRatio: '41x',
    revenue: '$637B TTM',
    revenueGrowth: '+11% YoY',
    thesis: 'AWS is the silent profit machine. Advertising business is the most underappreciated segment — now a $60B+ business.',
    whyWeCover: 'Amazon\'s AWS competes with Indian IT giants like TCS and Infosys — understanding it explains the risk to Indian IT.',
    risks: ['E-commerce margins structurally thin', 'Regulatory scrutiny on AWS market dominance', 'Logistics capex cycle continues'],
    tags: ['Cloud', 'E-commerce', 'Advertising'],
    color: '#ff9900',
  },
  {
    id: 'meta',
    name: 'Meta Platforms',
    ticker: 'META',
    exchange: 'NASDAQ',
    sector: 'Social Media / AI',
    marketCap: '$1.4T',
    peRatio: '26x',
    revenue: '$165B TTM',
    revenueGrowth: '+22% YoY',
    thesis: 'Best AI ROI story in big tech. Llama open-source strategy + ad targeting improvements = margin expansion + ecosystem lock-in.',
    whyWeCover: 'PPFAS holds Meta. With 500M+ Indians on WhatsApp + Instagram, Meta\'s India revenue is a direct domestic story.',
    risks: ['Apple ATT changes permanently impaired ad targeting', 'Reality Labs losses ($50B+ since 2020)', 'Antitrust breakup risk'],
    tags: ['Social media', 'AI', 'Advertising'],
    color: '#1877f2',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Data as of 11-Aug-2026
  // Sources: stockanalysis.com, Robinhood, Micron investor relations
  // MU price ~$864 (Robinhood, 10-Aug-2026); market cap ~$1.03T
  // TTM revenue $90.27B (Q3 FY2026 ended May 2026 — Micron IR + stockanalysis.com)
  // P/E ~19x TTM (macrotrends, stockanalysis.com — range 19–20x across sources)
  // Revenue growth: TTM +167% YoY (driven by HBM/AI memory super-cycle)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'mu',
    name: 'Micron Technology',
    ticker: 'MU',
    exchange: 'NASDAQ',
    sector: 'Semiconductors / Memory',
    marketCap: '$1.0T',
    peRatio: '~19x TTM',
    revenue: '$90.3B TTM',
    revenueGrowth: '+167% YoY',
    thesis: 'The AI memory supercycle is Micron\'s moment. HBM (High Bandwidth Memory) for AI training + data center DRAM demand = revenue growing 3–4x in 18 months. Trading at ~6x forward earnings — strikingly cheap for a company in a structural upcycle.',
    whyWeCover: 'AI infrastructure is the decade\'s biggest capital investment theme. Micron supplies the memory that makes AI possible — it\'s the quiet enabler behind every NVIDIA GPU. NVDA is already in many Indian international funds; MU is the next domino.',
    risks: [
      'Memory is a cyclical business — the current upcycle will eventually peak',
      'Chinese memory competitors (CXMT) gaining ground in commodity DRAM',
      'Apple reportedly sourcing memory from Chinese suppliers — reducing MU exposure',
      'HBM supply-demand balance could shift rapidly if AI capex cools',
    ],
    tags: ['Memory / HBM', 'AI infrastructure', 'Semiconductors', 'Cyclical'],
    color: '#007dba',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Data as of 11-Aug-2026
  // Sources: stockanalysis.com, Robinhood, AMD investor relations
  // AMD price ~$469 (Robinhood, 11-Aug-2026); market cap ~$766B
  // TTM revenue $41.31B (stockanalysis.com); FY2025 revenue $34.64B (+34% YoY)
  // P/E ~123x TTM (high because GAAP net income still low vs revenue — intangibles)
  // Revenue growth: TTM +19% YoY (Q2 FY2026 revenue $11.5B — beat estimates)
  // Stock +196% over past 52 weeks as of Aug 2026
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'amd',
    name: 'Advanced Micro Devices',
    ticker: 'AMD',
    exchange: 'NASDAQ',
    sector: 'Semiconductors / AI',
    marketCap: '$766B',
    peRatio: '~43x fwd',
    revenue: '$41.3B TTM',
    revenueGrowth: '+34% YoY (FY2025)',
    thesis: 'The only credible alternative to NVIDIA for AI accelerators. MI300X / MI350 GPU traction with hyperscalers is accelerating. EPYC server CPUs are gaining 30%+ market share vs Intel in data centers — a separate, underrated revenue stream.',
    whyWeCover: 'NVIDIA was already in our coverage as the AI infrastructure pick. AMD is the hedge — if NVDA\'s dominance ever cracks, AMD is positioned to capture the shift. It\'s also the picks-and-shovels play that Indian IT services firms (TCS, Infosys) are beginning to evaluate for client deployments.',
    risks: [
      'NVIDIA\'s CUDA ecosystem lock-in remains a massive structural moat vs AMD ROCm',
      'High trailing P/E (~123x) despite strong revenue growth — valuation risk',
      'Xilinx acquisition integration still dragging on margin expansion',
      'Custom silicon (Google TPUs, AWS Trainium) taking share from both NVDA and AMD',
    ],
    tags: ['AI accelerators', 'Data center CPU', 'Semiconductors', 'NVIDIA alternative'],
    color: '#ed1c24',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Data as of 11-Aug-2026
  // Sources: investing.com, tipranks.com, etfcentral.com, tradingview.com
  // QQQ price ~$720.87 (investing.com, 11-Aug-2026)
  // AUM ~$457.75B (TipRanks, Aug 03 2026); ~$493B per ETF Central (earlier data)
  // Expense ratio 0.18% — TipRanks / TradingView (consistent across sources)
  // 52-week range: $555.60 – $748.65
  // YTD performance: +20.70% (ETF Central, as of mid-Jun 2026)
  // Asset type: ETF — tracks Nasdaq-100 Index, NOT an individual stock
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'qqq',
    name: 'Invesco QQQ ETF',
    ticker: 'QQQ',
    exchange: 'NASDAQ',
    sector: 'ETF — Nasdaq-100 Index',
    marketCap: '~$458B AUM',
    peRatio: 'N/A (ETF)',
    revenue: 'N/A (ETF)',
    revenueGrowth: '+20.7% YTD (price return)',
    thesis: 'Not a stock — a basket of the 100 largest non-financial Nasdaq companies. Holds Apple, Microsoft, NVIDIA, Amazon, Meta, Alphabet, Tesla and 93 more. For Indian investors who want US tech exposure without picking individual stocks, QQQ is the single most efficient vehicle. Expense ratio 0.18% — cheaper than most Indian mutual funds.',
    whyWeCover: 'The simplest, most liquid way to track US tech broadly. Several Indian international fund-of-funds use QQQ or equivalent Nasdaq-100 instruments as their core holding. Understanding QQQ\'s composition explains the returns of any India-based US tech fund.',
    risks: [
      'Top 10 holdings = ~50% of the ETF — very concentrated in Magnificent Seven',
      'Heavy tech skew means QQQ drops harder than S&P 500 in risk-off environments',
      'USD/INR currency risk — a weakening USD erodes rupee-denominated returns',
      'Not a diversified ETF — zero exposure to financials, energy, or utilities',
    ],
    tags: ['ETF', 'Nasdaq-100', 'Index fund', 'US tech exposure'],
    color: '#0061a8',
  },
];
