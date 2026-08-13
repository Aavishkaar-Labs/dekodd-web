'use client';

import { useEffect, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Sends a page_view on every client-side route change.
 * gtag's own auto page_view only fires once, on initial script load —
 * the App Router never does a full page reload, so without this,
 * navigating between pages would never register as a new pageview.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

    const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
