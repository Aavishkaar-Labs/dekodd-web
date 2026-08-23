'use client';

import { useMemo, useState } from 'react';
import type { IPO, IPOStatus } from '@/lib/ipo/types';
import IPOCard from './IPOCard';

interface Props {
  ipos: IPO[];
}

const TABS: { key: IPOStatus; label: string }[] = [
  { key: 'UPCOMING', label: 'Upcoming' },
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
];

export default function IPOListClient({ ipos }: Props) {
  const [tab, setTab] = useState<IPOStatus>('UPCOMING');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<IPOStatus, number> = { UPCOMING: 0, OPEN: 0, CLOSED: 0 };
    for (const ipo of ipos) c[ipo.status]++;
    return c;
  }, [ipos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ipos.filter((ipo) => {
      if (ipo.status !== tab) return false;
      if (q && !ipo.name.toLowerCase().includes(q) && !ipo.symbol.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [ipos, tab, query]);

  return (
    <>
      <div className="ipo-controls">
        <div className="ipo-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`ipo-tab ${tab === t.key ? 'ipo-tab-active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <span className="ipo-tab-count">{counts[t.key]}</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          className="ipo-search"
          placeholder="Search by company or symbol"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search IPOs"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="ipo-empty">No {TABS.find((t) => t.key === tab)?.label.toLowerCase()} IPOs match your search.</div>
      ) : (
        <div className="ipo-grid" role="list">
          {filtered.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </div>
      )}
    </>
  );
}
