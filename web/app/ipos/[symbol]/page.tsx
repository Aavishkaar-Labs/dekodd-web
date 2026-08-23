import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/ipo/StatusBadge';
import IPOTimeline from '@/components/ipo/IPOTimeline';
import GMPSection from '@/components/ipo/GMPSection';
import SubscriptionSection from '@/components/ipo/SubscriptionSection';
import DekoddSnapshot from '@/components/ipo/DekoddSnapshot';
import { getIpoBySymbol, IPOProviderError } from '@/lib/ipo/finApiProvider';
import { getDateIntelligence, formatShortDate } from '@/lib/ipo/dateHelpers';
import '../ipos.css';

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const ipo = await getIpoBySymbol(symbol).catch(() => null);
  if (!ipo) return { title: 'IPO Not Found | Dekodd' };

  const title = `${ipo.name} IPO – Price, Dates, GMP & Details | Dekodd`;
  const description = `${ipo.name} IPO details: price band, key dates, issue size, GMP and subscription status. Educational information for India's retail investors.`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function IPODetailPage({ params }: Props) {
  const { symbol } = await params;

  let ipo;
  try {
    ipo = await getIpoBySymbol(symbol);
  } catch (err) {
    if (err instanceof IPOProviderError) {
      console.error('[ipo detail page] provider error:', err.message, err.cause ?? '');
    }
    return (
      <>
        <Nav />
        <main>
          <section className="ipo-detail-section">
            <div className="wrap">
              <div className="ipo-error">IPO data is temporarily unavailable. Please try again later.</div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!ipo) notFound();

  const dateNote = getDateIntelligence(ipo);
  const priceLabel = ipo.priceRange
    ? ipo.priceRange.min !== ipo.priceRange.max
      ? `₹${ipo.priceRange.min} – ₹${ipo.priceRange.max}`
      : `₹${ipo.priceRange.max}`
    : undefined;

  return (
    <>
      <Nav />
      <main>
        <section className="ipo-detail-hero">
          <div className="wrap">
            <div className="ipo-detail-header">
              {ipo.logoUrl ? (
                <Image src={ipo.logoUrl} alt="" width={64} height={64} className="ipo-detail-logo" unoptimized />
              ) : (
                <div className="ipo-detail-logo ipo-card-logo-fallback" aria-hidden="true">
                  {ipo.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="ipo-detail-name">{ipo.name}</h1>
                <div className="ipo-card-badges">
                  {ipo.type && <span className="ipo-type-badge">{ipo.type}</span>}
                  <StatusBadge status={ipo.status} />
                  {ipo.exchanges && <span className="ipo-exchange-badge">{ipo.exchanges}</span>}
                </div>
              </div>
            </div>
            {dateNote && <div className="ipo-card-note ipo-detail-note">{dateNote}</div>}
          </div>
        </section>

        <section className="ipo-detail-section">
          <div className="wrap ipo-detail-grid">
            <div className="ipo-detail-main">
              <div className="ipo-snapshot-panel">
                <h2 className="ipo-section-title">IPO Snapshot</h2>
                <div className="ipo-snapshot-panel-grid">
                  {priceLabel && (
                    <div className="ipo-snapshot-panel-item">
                      <span>Price Band</span>
                      <span>{priceLabel}</span>
                    </div>
                  )}
                  {ipo.issueSize?.totalCr && (
                    <div className="ipo-snapshot-panel-item">
                      <span>Issue Size</span>
                      <span>₹{ipo.issueSize.totalCr.toLocaleString('en-IN')} Cr</span>
                    </div>
                  )}
                  {formatShortDate(ipo.schedule?.startDate) && (
                    <div className="ipo-snapshot-panel-item">
                      <span>IPO Open Date</span>
                      <span>{formatShortDate(ipo.schedule?.startDate)}</span>
                    </div>
                  )}
                  {formatShortDate(ipo.schedule?.endDate) && (
                    <div className="ipo-snapshot-panel-item">
                      <span>IPO Close Date</span>
                      <span>{formatShortDate(ipo.schedule?.endDate)}</span>
                    </div>
                  )}
                  {ipo.lotSize && (
                    <div className="ipo-snapshot-panel-item">
                      <span>Lot Size</span>
                      <span>{ipo.lotSize}</span>
                    </div>
                  )}
                  {ipo.minimumInvestment && (
                    <div className="ipo-snapshot-panel-item">
                      <span>Minimum Investment</span>
                      <span>₹{ipo.minimumInvestment.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {formatShortDate(ipo.schedule?.listingDate) && (
                    <div className="ipo-snapshot-panel-item">
                      <span>Listing Date</span>
                      <span>{formatShortDate(ipo.schedule?.listingDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {ipo.schedule && (
                <div className="ipo-timeline-panel">
                  <h2 className="ipo-section-title">IPO Timeline</h2>
                  <IPOTimeline ipo={ipo} />
                </div>
              )}

              {ipo.aboutCompany && (
                <div className="ipo-about-panel">
                  <h2 className="ipo-section-title">About the Company</h2>
                  <p>{ipo.aboutCompany}</p>
                </div>
              )}

              {ipo.strengths && ipo.strengths.length > 0 && (
                <div className="ipo-strengths-panel">
                  <h2 className="ipo-section-title">Strengths</h2>
                  <ul>
                    {ipo.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ipo.risks && ipo.risks.length > 0 && (
                <div className="ipo-risks-panel">
                  <h2 className="ipo-section-title">Risks</h2>
                  <ul>
                    {ipo.risks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="ipo-disclaimer ipo-disclaimer-footer">
                IPO information is provided for educational and informational purposes only and should not be
                considered investment advice. GMP is unofficial and does not guarantee listing performance.
              </p>
            </div>

            <aside className="ipo-detail-aside">
              <DekoddSnapshot ipo={ipo} />
              <GMPSection ipo={ipo} />
              <SubscriptionSection ipo={ipo} />
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
