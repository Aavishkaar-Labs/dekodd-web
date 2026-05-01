import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Waitlist from '@/components/Waitlist';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Waitlist', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders the form initially', () => {
    render(<Waitlist />);
    expect(screen.getByPlaceholderText('you@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join waitlist/i })).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    render(<Waitlist />);
    const input = screen.getByPlaceholderText('you@email.com');
    const button = screen.getByRole('button', { name: /Join waitlist/i });

    await userEvent.type(input, 'not-an-email');
    fireEvent.click(button);

    expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('shows success message on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Waitlist />);
    const input = screen.getByPlaceholderText('you@email.com');
    await userEvent.type(input, 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: /Join waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/You're in/i)).toBeInTheDocument();
    });
    expect(mockFetch).toHaveBeenCalledWith('/api/waitlist', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    }));
  });

  it('shows server error message on API failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error.' }),
    });

    render(<Waitlist />);
    const input = screen.getByPlaceholderText('you@email.com');
    await userEvent.type(input, 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: /Join waitlist/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Server error.');
    });
  });
});
