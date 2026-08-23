import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import IPOListClient from '@/components/ipo/IPOListClient';
import { getAllIpos, IPOProviderError } from '@/lib/ipo/finApiProvider';
import './ipos.css';

export const metadata: Metadata = {
  title: 'Upcoming IPOs in India | Dekodd',
  description:
    "Track upcoming IPOs in India, including issue dates, price bands, issue size, GMP, subscription and listing information.",
  openGraph: {
    title: 'Upcoming IPOs in India | Dekodd',
    description:
      "Track upcoming IPOs in India, including issue dates, price bands, issue size, GMP, subscription and listing information.",
    type: 'website',
  },
};

export default async function IPOsPage() {
  let ipos: Awaited<ReturnType<typeof getAllIpos>> = [];
  let errored = false;

  try {
    ipos = await getAllIpos();
  } catch (err) {
    errored = true;
    if (err instanceof IPOProviderError) {
      console.error('[ipos page] provider error:', err.message, err.cause ?? '');
    }
  }

  return (
    <>
      <Nav />
      <main>
        <section className="ipo-hero">
          <div className="wrap">
            <div className="ipo-hero-eyebrow">
              <span className="pulse-dot" />
              IPO Tracker
            </div>
            <h1 className="ipo-hero-h1">IPO Tracker</h1>
            <p className="ipo-hero-sub">Discover upcoming, open and recently listed IPOs in India.</p>
          </div>
        </section>

        <section className="ipo-list-section">
          <div className="wrap">
            {errored ? (
              <div className="ipo-error">IPO data is temporarily unavailable. Please try again later.</div>
            ) : (
              <IPOListClient ipos={ipos} />
            )}
            <p className="ipo-disclaimer ipo-disclaimer-footer">
              IPO information is provided for educational and informational purposes only and should not be
              considered investment advice. GMP is unofficial and does not guarantee listing performance.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
