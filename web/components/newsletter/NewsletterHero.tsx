export default function NewsletterHero() {
  return (
    <section className="nl-hero">
      <div className="wrap">
        <div className="nl-hero-eyebrow">
          <span className="pulse-dot" />
          Artha by Dekodd · Vol. 1
        </div>
        <div className="nl-hero-grid">
          <div className="nl-hero-left">
            <h1 className="nl-hero-h1">
              Your market
              <br />
              <em className="nl-hero-em">made legible.</em>
            </h1>
            <p className="nl-hero-sub">
              Every week, Artha breaks down the funds, stocks, and strategies that matter for{' '}
              <strong>India&apos;s retail investors</strong> — without jargon, without noise,
              without telling you what to buy.
            </p>
            <div className="nl-hero-meta">
              <span>5 Mutual Funds covered</span>
              <span>5 US Stocks tracked</span>
              <span>Age-based allocation guide</span>
            </div>
          </div>
          <div className="nl-hero-right">
            <div className="nl-issue-card">
              <div className="nl-issue-label">This issue</div>
              <ul className="nl-issue-list">
                <li>
                  <span className="nl-issue-num">01</span>
                  Mutual funds we actually believe in
                </li>
                <li>
                  <span className="nl-issue-num">02</span>
                  5 US giants — and why Indian investors care
                </li>
                <li>
                  <span className="nl-issue-num">03</span>
                  How to invest based on your age
                </li>
                <li>
                  <span className="nl-issue-num">04</span>
                  Flexi, Mid, Small — your SIP split explained
                </li>
              </ul>
              <div className="nl-issue-footer">
                <span>Not financial advice.</span>
                <span>Always educational.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
