export default function NewsletterDisclaimer() {
  return (
    <section className="nl-disclaimer">
      <div className="wrap-tight">
        <div className="nl-disclaimer-inner">
          <div className="nl-disclaimer-icon" aria-hidden="true">⚖</div>
          <div>
            <p className="nl-disclaimer-title">Important disclaimer</p>
            <p className="nl-disclaimer-text">
              This is an educational newsletter. Nothing here is personalised financial advice.
              Mutual fund and stock information is for educational purposes only. Past performance
              is not indicative of future results. Please consult a SEBI-registered investment
              advisor before making any investment decisions. Dekodd does not earn commissions from
              any fund house or stock mentioned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
