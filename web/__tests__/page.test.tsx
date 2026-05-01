import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/Nav', () => () => <nav data-testid="nav" />);
jest.mock('@/components/Hero', () => () => <section data-testid="hero" />);
jest.mock('@/components/Ticker', () => () => <div data-testid="ticker" />);
jest.mock('@/components/Problem', () => () => <section data-testid="problem" />);
jest.mock('@/components/Features', () => () => <section data-testid="features" />);
jest.mock('@/components/Principles', () => () => <section data-testid="principles" />);
jest.mock('@/components/Waitlist', () => () => <section data-testid="waitlist" />);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer" />);

describe('Home page', () => {
  it('renders all major sections', () => {
    render(<Home />);
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('ticker')).toBeInTheDocument();
    expect(screen.getByTestId('problem')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('principles')).toBeInTheDocument();
    expect(screen.getByTestId('waitlist')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
