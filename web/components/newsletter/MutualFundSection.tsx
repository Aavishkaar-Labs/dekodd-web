import type { MutualFund } from '@/lib/newsletter/mutualFunds';
import MutualFundCard from './MutualFundCard';

interface Props {
  funds: MutualFund[];
}

export default function MutualFundSection({ funds }: Props) {
  return (
    <section className="nl-section nl-mf-section" id="mutual-funds">
      <div className="wrap">
        <div className="nl-section-header">
          <div className="section-eyebrow">Mutual Funds We Cover</div>
          <h2 className="nl-section-h">
            Funds worth
            <br />
            <em className="nl-em">your attention.</em>
          </h2>
          <p className="nl-section-sub">
            Not every fund makes the cut. We cover funds with consistent process, honest management, and a clear reason to exist.
            Past returns are shown for context — not a promise.
          </p>
        </div>

        <div className="mf-list" role="list">
          {funds.map((fund, i) => (
            <MutualFundCard key={fund.id} fund={fund} index={i} />
          ))}
        </div>

        <p className="nl-data-note">
          Returns as of latest available data. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
}
