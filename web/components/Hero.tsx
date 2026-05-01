import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          {/* Left: Copy */}
          <div>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              Coming soon · India · 2026
            </div>

            <h1>
              Everyday{' '}
              <span className="em" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>
                Market
              </span>{' '}
              Intel.
            </h1>

            <p className="hero-sub">
              You opened a demat account. You bought some stocks. Now you watch
              the numbers go red and green and feel something that isn&apos;t quite
              understanding. Dekodd is the friend who explains{' '}
              <strong>
                what&apos;s happening, why it&apos;s happening, and how to think about it
              </strong>{' '}
              — without ever telling you what to buy.
            </p>

            <div className="hero-cta-row">
              <Link href="#features" className="btn-primary">
                See how it works
                <svg
                  className="btn-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="hero-meta">
              <span>No advice, ever</span>
              <span>India · 2026</span>
            </div>
          </div>

          {/* Right: Icon showcase */}
          <div className="hero-icon-stage">
            <div className="icon-orb-bg" />

            {/* Main large icon */}
            <div className="icon-orb">
              <div className="icon-main">
                <Image
                  src="/dekodd-icon-dark.svg"
                  alt="Dekodd app icon"
                  width={360}
                  height={360}
                  priority
                />
              </div>
            </div>

            {/* Mini orbiting icons */}
            <div className="icon-mini icon-mini-1">
              <Image src="/dekodd-icon.svg" alt="" width={100} height={100} aria-hidden="true" />
            </div>
            <div className="icon-mini icon-mini-2">
              <Image src="/dekodd-icon-dark.svg" alt="" width={100} height={100} aria-hidden="true" />
            </div>
            <div className="icon-mini icon-mini-3">
              <Image src="/dekodd-icon.svg" alt="" width={100} height={100} aria-hidden="true" />
            </div>

            {/* Hand-written annotation */}
            <div className="scribble scribble-1">
              <div
                className="text"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                explains things,
                <br />
                doesn&apos;t trade for you
              </div>
              <svg width="56" height="40" viewBox="0 0 56 40" fill="none" aria-hidden="true">
                <path
                  d="M5 8 Q20 4 30 14 T50 32"
                  stroke="#0099cc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M50 32 L44 28 M50 32 L46 38"
                  stroke="#0099cc"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
