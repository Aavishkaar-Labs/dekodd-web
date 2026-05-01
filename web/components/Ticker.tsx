const ITEMS = [
  { label: 'Plain English.', rest: 'Not jargon.' },
  { label: 'Why it moved.', rest: 'Not what to buy.' },
  { label: 'Daily briefs.', rest: 'Two minutes flat.' },
  { label: 'Tap any word', rest: 'for an instant explanation.' },
  { label: 'No advice.', rest: 'Ever.' },
  { label: 'Everyday Market Intel.', rest: 'Only from Dekodd.' },
];

export default function Ticker() {
  const allItems = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker">
      <div className="ticker-track" aria-hidden="true">
        {allItems.map((item, i) => (
          <span className="ticker-item" key={i}>
            <span className="dot">◆</span>
            <span className="label">{item.label}</span>
            {item.rest}
          </span>
        ))}
      </div>
    </div>
  );
}
