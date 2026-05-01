'use client';

import { useState } from 'react';
import Image from 'next/image';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="wrap">
        <div className="waitlist-inner">
          <div className="waitlist-eyebrow">
            <span className="pulse-dot" />
            Coming soon · Limited beta first
          </div>

          <h2>
            Be among the first{' '}
            <span
              className="em"
              style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
            >
              1,000
            </span>
            .
          </h2>

          <p className="desc">
            We&apos;re shipping in 4 months. Early users get free Dekodd Plus for
            6 months, a private founder feedback channel, and the satisfaction of
            helping shape a finance app that doesn&apos;t feel like one.
          </p>

          {status === 'success' ? (
            <div className="waitlist-success">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>You&apos;re in. We&apos;ll email you the moment Dekodd opens up.</span>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="waitlist-error" role="alert">
                  {errorMsg}
                </div>
              )}
              <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                />
                <button type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Joining…' : 'Join waitlist'}
                  {status !== 'loading' && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>
              </form>
            </>
          )}

          <div className="waitlist-meta">
            <span>India launch first</span>
            <span>iOS &amp; Android</span>
            <span>No spam. One email.</span>
          </div>
        </div>

        {/* Decorative icon stack */}
        <div className="waitlist-icon-stack" aria-hidden="true">
          <div className="stack-icon s1">
            <Image src="/dekodd-icon.svg" alt="" width={92} height={92} />
          </div>
          <div className="stack-icon s2">
            <Image src="/dekodd-icon-dark.svg" alt="" width={92} height={92} />
          </div>
          <div className="stack-icon s3">
            <Image src="/dekodd-icon.svg" alt="" width={92} height={92} />
          </div>
        </div>
      </div>
    </section>
  );
}
