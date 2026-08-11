export interface AgeStrategy {
  ageRange: string;
  label: string;
  tagline: string;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive' | 'Very Aggressive';
  horizon: string;
  monthlyIncome: string;
  recommendedSip: string;
  keyPrinciples: string[];
  allocation: {
    equity: number;
    debt: number;
    gold: number;
    international: number;
  };
  sipSplit: {
    flexiCap: number;
    midCap: number;
    smallCap: number;
  };
  bestFor: string;
  watchOut: string;
}

export const ageStrategies: AgeStrategy[] = [
  {
    ageRange: '18–25',
    label: 'Foundation Builder',
    tagline: 'Time is your biggest asset. Use it.',
    riskProfile: 'Very Aggressive',
    horizon: '20–40 years',
    monthlyIncome: '₹20,000–₹50,000',
    recommendedSip: '20–30% of income',
    keyPrinciples: [
      'Start small — ₹500/month is better than waiting',
      'Equity-heavy because time absorbs volatility',
      'Build the habit before optimising the amount',
      'Don\'t touch your SIP during market falls — that\'s the point',
    ],
    allocation: {
      equity: 80,
      debt: 5,
      gold: 5,
      international: 10,
    },
    sipSplit: {
      flexiCap: 50,
      midCap: 30,
      smallCap: 20,
    },
    bestFor: 'Long compounding runway. ₹5,000/month at 20 years = ₹3.5 Cr by 45.',
    watchOut: 'Don\'t redeem when markets fall 30%. That fall is temporary; missing the recovery is permanent.',
  },
  {
    ageRange: '26–35',
    label: 'Growth Accumulator',
    tagline: 'Income is rising. Let your portfolio rise with it.',
    riskProfile: 'Aggressive',
    horizon: '15–25 years',
    monthlyIncome: '₹50,000–₹1,50,000',
    recommendedSip: '25–35% of income',
    keyPrinciples: [
      'Step up SIP by 10% every year as income grows',
      'Keep 6-month emergency fund before investing',
      'ELSS for tax saving — don\'t waste 80C',
      'Begin international allocation via international funds',
    ],
    allocation: {
      equity: 75,
      debt: 10,
      gold: 5,
      international: 10,
    },
    sipSplit: {
      flexiCap: 45,
      midCap: 35,
      smallCap: 20,
    },
    bestFor: 'Peak compounding period. Income growing + expenses manageable = maximum surplus to invest.',
    watchOut: 'Lifestyle inflation is the biggest portfolio killer at this age. Raise SIP before raising lifestyle.',
  },
  {
    ageRange: '36–45',
    label: 'Wealth Protector',
    tagline: 'You\'ve built something. Now protect it.',
    riskProfile: 'Moderate',
    horizon: '10–20 years',
    monthlyIncome: '₹1,00,000–₹3,00,000',
    recommendedSip: '20–30% of income',
    keyPrinciples: [
      'Shift 10–15% to large caps and balanced funds',
      'Review portfolio once a year and rebalance',
      'Start term insurance + health insurance if you haven\'t',
      'Reduce small-cap exposure as goals approach',
    ],
    allocation: {
      equity: 65,
      debt: 20,
      gold: 7,
      international: 8,
    },
    sipSplit: {
      flexiCap: 55,
      midCap: 30,
      smallCap: 15,
    },
    bestFor: 'Children\'s education in 10-15 years. Home loan repayment. Retirement corpus building.',
    watchOut: 'Don\'t let past bull market returns make you overconfident. The next decade won\'t look like the last.',
  },
  {
    ageRange: '46–55',
    label: 'Pre-Retirement Planner',
    tagline: 'Less time for recovery. Be deliberate.',
    riskProfile: 'Moderate',
    horizon: '5–15 years',
    monthlyIncome: '₹1,50,000–₹5,00,000',
    recommendedSip: '15–25% of income',
    keyPrinciples: [
      'Move 40-50% to debt — FDs, debt MFs, PPF',
      'Equity only in large-cap and flexi-cap funds',
      'Avoid new small/mid-cap positions',
      'Calculate retirement corpus target — work backward',
    ],
    allocation: {
      equity: 50,
      debt: 35,
      gold: 10,
      international: 5,
    },
    sipSplit: {
      flexiCap: 70,
      midCap: 20,
      smallCap: 10,
    },
    bestFor: 'Goal-based investing — retirement at 60, children\'s wedding, property.',
    watchOut: 'A 40% market crash at 55 with 100% equity can take 5+ years to recover. That\'s your retirement delayed.',
  },
  {
    ageRange: '56+',
    label: 'Capital Preserver',
    tagline: 'Make your money last longer than you need it to.',
    riskProfile: 'Conservative',
    horizon: '0–10 years',
    monthlyIncome: 'Pension / corpus withdrawal',
    recommendedSip: 'SWP (Systematic Withdrawal Plan)',
    keyPrinciples: [
      'Prioritise capital preservation over growth',
      'Senior Citizens Savings Scheme (SCSS) — 8.2% guaranteed',
      'Keep 3-4 years of expenses in liquid/debt funds',
      'Use Systematic Withdrawal Plan instead of SIP',
    ],
    allocation: {
      equity: 25,
      debt: 55,
      gold: 15,
      international: 5,
    },
    sipSplit: {
      flexiCap: 80,
      midCap: 15,
      smallCap: 5,
    },
    bestFor: 'Monthly income generation. Tax-efficient withdrawal strategy. Estate planning.',
    watchOut: 'Inflation is the real enemy at this stage. 100% debt will erode purchasing power over 20 years.',
  },
];

export type AgeRange = '18–25' | '26–35' | '36–45' | '46–55' | '56+';
