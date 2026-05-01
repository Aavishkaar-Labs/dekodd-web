import ScrollReveal from './ScrollReveal';

const STATS = [
  {
    num: '150',
    suffix: 'M+',
    label: "new demat accounts in India between 2020-25 — the world's fastest retail growth.",
  },
  {
    num: '3',
    suffix: 'x',
    label: "products that fail this user — broker apps, news apps, learning apps. None close the gap.",
  },
  {
    num: '90',
    suffix: 's',
    label: 'how long it should take to understand what moved your portfolio today.',
  },
];

export default function Problem() {
  return (
    <section className="problem">
      <div className="wrap-tight">
        <div className="section-eyebrow">The problem</div>
        <h2 className="section-h">
          India added 150 million new investors.{' '}
          <span
            className="em"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Almost none of them were taught.
          </span>
        </h2>

        <p
          className="problem-quote"
          style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          You see a <span className="underline-hl">red number</span> and feel
          anxious. You see a <span className="underline-hl">green number</span>{' '}
          and feel lucky.{' '}
          <em style={{ color: 'var(--cyan-deeper)' }}>
            Neither one is understanding.
          </em>
        </p>
        <p className="problem-attr">— The gap that Dekodd exists to close</p>

        <div className="problem-stats">
          {STATS.map((stat, i) => (
            <ScrollReveal key={i} className="stat" delay={i * 100}>
              <div className="stat-num">
                {stat.num}
                <span className="small">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
