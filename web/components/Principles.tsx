import ScrollReveal from './ScrollReveal';

const PRINCIPLES = [
  {
    mark: '01',
    strike: 'Tell you what to buy.',
    bold: 'We explain. You decide.',
  },
  {
    mark: '02',
    strike: 'Show you ads.',
    bold: 'Subscription is our only revenue stream.',
  },
  {
    mark: '03',
    strike: 'Run paid stock promotions.',
    bold: 'No broker affiliate, no incentive to make you trade.',
  },
  {
    mark: '04',
    strike: 'Lock learning behind a paywall.',
    bold: 'The glossary and learning paths stay free, forever.',
  },
  {
    mark: '05',
    strike: 'Use leaderboards or XP to drive engagement.',
    bold: 'Calmer investors beat hyped ones.',
  },
];

export default function Principles() {
  return (
    <section className="principles" id="principles">
      <div className="wrap">
        <div className="principles-grid">
          <div>
            <div className="section-eyebrow">How we work</div>
            <h2 className="section-h">
              Some things we will{' '}
              <span
                className="em"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                never
              </span>{' '}
              do.
            </h2>
            <p className="section-sub">
              Most finance apps are optimised to make you trade more. Dekodd is
              optimised to make you understand more. The constraints below
              aren&apos;t a marketing line — they&apos;re the product itself.
            </p>
          </div>

          <div className="principle-list">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={i} className="principle-row" delay={i * 80}>
                <div className="principle-mark">{p.mark}</div>
                <div className="principle-text">
                  <span className="strike">{p.strike}</span>{' '}
                  <strong>{p.bold}</strong>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
