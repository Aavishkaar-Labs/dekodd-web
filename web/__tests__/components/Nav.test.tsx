import { render, screen } from '@testing-library/react';
import Nav from '@/components/Nav';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('Dekodd')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Nav />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('How we work')).toBeInTheDocument();
    expect(screen.getByText(/Join waitlist/i)).toBeInTheDocument();
  });

  it('waitlist link points to the correct section', () => {
    render(<Nav />);
    const waitlistLink = screen.getByText(/Join waitlist/i).closest('a');
    expect(waitlistLink).toHaveAttribute('href', '#waitlist');
  });
});
