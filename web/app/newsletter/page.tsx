import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import NewsletterHero from '@/components/newsletter/NewsletterHero';
import MutualFundSection from '@/components/newsletter/MutualFundSection';
import USStocksSection from '@/components/newsletter/USStocksSection';
import AgeStrategySection from '@/components/newsletter/AgeStrategySection';
import SIPAllocationSection from '@/components/newsletter/SIPAllocationSection';
import NewsletterDisclaimer from '@/components/newsletter/NewsletterDisclaimer';
import { mutualFunds, usStocks, ageStrategies } from '@/lib/newsletter';
import './newsletter.css';

export const metadata: Metadata = {
  title: 'Newsletter — Monthly Market Intelligence | Dekodd',
  description:
    'Dekodd breaks down mutual funds, US stocks, and age-based investment strategies for India\'s retail investors — without jargon, without noise.',
  keywords: ['mutual funds India', 'SIP allocation', 'US stocks India', 'investing by age', 'Dekodd newsletter'],
  openGraph: {
    title: 'Newsletter — Monthly Market Intelligence | Dekodd',
    description: 'Educational investing newsletter for India\'s retail investors. Mutual funds, US stocks, and age-based strategies explained simply.',
    type: 'website',
  },
};

export default function NewsletterPage() {
  // Data access layer — swap these for async fetches when moving to dynamic:
  // const funds = await getMutualFunds();
  const funds = mutualFunds;
  const stocks = usStocks;
  const strategies = ageStrategies;

  return (
    <>
      <Nav />
      <main>
        <NewsletterHero />
        <MutualFundSection funds={funds} />
        <USStocksSection stocks={stocks} />
        <AgeStrategySection strategies={strategies} />
        <SIPAllocationSection strategies={strategies} />
        <NewsletterDisclaimer />
      </main>
      <Footer />
    </>
  );
}
