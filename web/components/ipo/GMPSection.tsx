import type { IPO } from '@/lib/ipo/types';

interface Props {
  ipo: IPO;
}

export default function GMPSection({ ipo }: Props) {
  const { gmp, priceRange } = ipo;
  if (!gmp || gmp.latest === undefined) return null;

  const impliedListingPrice = priceRange?.max !== undefined ? priceRange.max + gmp.latest : undefined;
  const impliedPremiumPct =
    priceRange?.max !== undefined && priceRange.max !== 0 ? (gmp.latest / priceRange.max) * 100 : undefined;

  return (
    <div className="ipo-gmp-section">
      <h3 className="ipo-section-title">Grey Market Premium</h3>

      <div className="ipo-gmp-grid">
        <div className="ipo-gmp-row">
          <span>GMP</span>
          <span className="ipo-gmp-val">₹{gmp.latest}</span>
        </div>
        {priceRange?.max !== undefined && (
          <div className="ipo-gmp-row">
            <span>IPO Upper Price</span>
            <span className="ipo-gmp-val">₹{priceRange.max}</span>
          </div>
        )}
        {impliedListingPrice !== undefined && (
          <div className="ipo-gmp-row">
            <span>Implied Listing Price</span>
            <span className="ipo-gmp-val">₹{impliedListingPrice.toFixed(0)}</span>
          </div>
        )}
        {impliedPremiumPct !== undefined && (
          <div className="ipo-gmp-row">
            <span>Implied Premium</span>
            <span className="ipo-gmp-val">{impliedPremiumPct.toFixed(1)}%</span>
          </div>
        )}
      </div>

      {gmp.lastUpdated && <p className="ipo-gmp-updated">Last updated: {gmp.lastUpdated}</p>}

      <p className="ipo-disclaimer">
        Grey Market Premium (GMP) is an unofficial market indicator and does not guarantee the IPO&apos;s listing
        price or future performance.
        {gmp.sourceUrl && (
          <>
            {' '}
            Data via{' '}
            <a href={gmp.sourceUrl} target="_blank" rel="noopener noreferrer">
              source
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
