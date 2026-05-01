import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="icon-wrap">
              <Image src="/dekodd-icon.svg" alt="Dekodd" width={32} height={32} />
            </div>
            <div>
              <div className="text">Dekodd</div>
              <div
                className="footer-tagline"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                Everyday Market Intel.
              </div>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="#features">Features</Link>
            <Link href="#principles">How we work</Link>
            <a href="mailto:hello@dekodd.app">Contact</a>
            <a
              href="https://www.instagram.com/dekodd.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dekodd on Instagram"
              className="footer-social"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @dekodd.app
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Dekodd. Educational product. Not investment advice.</span>
          <span>Made in India · launching India-first</span>
        </div>
      </div>
    </footer>
  );
}
