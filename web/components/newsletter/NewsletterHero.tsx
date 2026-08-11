export default function NewsletterHero() {
  return (
    <section className="nl-hero">
      <div className="wrap">
        <div className="nl-hero-eyebrow">
          <span className="pulse-dot" />
          The Newsletter · Issue 01
        </div>
        <div className="nl-hero-grid">
          <div className="nl-hero-left">
            <h1 className="nl-hero-h1">
              Your market
              <br />
              <em className="nl-hero-em">made legible.</em>
            </h1>
            <p className="nl-hero-sub">
              Every month, Dekodd breaks down the funds, stocks, and strategies that matter for{' '}
              <strong>India&apos;s retail investors</strong> — without jargon, without noise,
              without telling you what to buy.
            </p>
          </div>
          <div className="nl-hero-right">
            <div className="nl-issue-card">
              <div className="nl-issue-label">This issue</div>
              <ul className="nl-issue-list">
                <li>
                  <a href="#mutual-funds">
                    <span className="nl-issue-num">01</span>
                    Mutual funds we actually believe in
                  </a>
                </li>
                <li>
                  <a href="#us-stocks">
                    <span className="nl-issue-num">02</span>
                    5 US giants — and why Indian investors care
                  </a>
                </li>
                <li>
                  <a href="#age-strategy">
                    <span className="nl-issue-num">03</span>
                    How to invest based on your age
                  </a>
                </li>
                <li>
                  <a href="#sip-allocation">
                    <span className="nl-issue-num">04</span>
                    Flexi, Mid, Small — your SIP split explained
                  </a>
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
