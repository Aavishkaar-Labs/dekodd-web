import ScrollReveal from './ScrollReveal';

const FEATURES = [
  {
    num: '01 / DAILY HABIT',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: <>The <span className="em">Daily Brief</span></>,
    desc: 'Twice-daily plain-language summary. Morning at 8:45 IST, evening wrap at 4:15. Each ends with one sentence you can actually use. Under 90 seconds, every time.',
    tag: '📌 The reason to open the app',
  },
  {
    num: '02 / THE DIFFERENTIATOR',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: <>&ldquo;Why is it <span className="em">moving?</span>&rdquo;</>,
    desc: "Tap any stock and see exactly what's pushing the price today — top driver, secondary drivers, confidence rating, linked sources. When we don't know, we say so.",
    tag: '📲 The reason your friends will install it',
  },
  {
    num: '03 / AMBIENT LEARNING',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: <>Tap-to-define <span className="em">glossary</span></>,
    desc: 'Any term you don\'t know — anywhere in the app — tap once. Plain definition, friendly analogy, and a "see in action" link to a real recent example.',
    tag: '📖 You learn just by reading',
  },
  {
    num: '04 / YOUR STOCKS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: <>Annotated <span className="em">charts</span></>,
    desc: 'A raw chart is an abstraction. Ours flag every event that mattered — earnings, dividends, news. Tap a flag, get the explanation. Charts as story, not noise.',
    tag: '📊 Personalised, sticky, contextual',
  },
  {
    num: '05 / WHAT OTHERS SEE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: <>Sentiment <span className="em">Pulse</span></>,
    desc: 'Aggregate retail sentiment with the topics actually driving it. Not just "bearish on ICICI" but "bearish about margin pressure, specifically." Caveat always visible.',
    tag: '🔍 Topic-aware. Honestly framed.',
  },
  {
    num: '06 / GO DEEPER',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: <>Six <span className="em">Learning Paths</span></>,
    desc: 'Forty-eight short lessons — earnings, charts, interest rates, mutual funds, news without panic. No XP. No badges. Just one daily streak that ticks up quietly.',
    tag: '🎓 Permanently free. Always.',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="section-eyebrow">What it does</div>
        <h2 className="section-h">
          Six features.{' '}
          <span className="em" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>
            One job.
          </span>
        </h2>
        <p className="section-sub">
          Every feature in Dekodd serves one goal: helping an overwhelmed retail
          investor understand the market. Anything that didn&apos;t serve that goal
          cleanly was cut.
        </p>

        <div className="feature-grid">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={i} className="feature-card" delay={i * 60}>
              <span className="feature-num">{feature.num}</span>
              <div className="feature-icon-wrap">{feature.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display, system-ui, sans-serif)' }}>
                {feature.title}
              </h3>
              <p>{feature.desc}</p>
              <div className="feature-tag">{feature.tag}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
