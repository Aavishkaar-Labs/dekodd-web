import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import Principles from '@/components/Principles';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Features />
        <Principles />
      </main>
      <Footer />
    </>
  );
}
