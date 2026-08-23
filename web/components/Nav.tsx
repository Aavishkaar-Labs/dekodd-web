import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <div className="icon-wrap">
            <Image
              src="/dekodd-icon.svg"
              alt="Dekodd"
              width={32}
              height={32}
              priority
            />
          </div>
          <span className="brand-text">Dekodd</span>
        </Link>

        <div className="nav-links">
          <Link href="/#features">Features</Link>
          <Link href="/#principles">How we work</Link>
          <Link href="/ipos">IPOs</Link>
          <Link href="/newsletter" className="nav-newsletter-link">Newsletter</Link>
        </div>
      </div>
    </nav>
  );
}
