import { NextRequest, NextResponse } from 'next/server';
import { getIpoBySymbol, IPOProviderError } from '@/lib/ipo/finApiProvider';

export async function GET(request: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;

  let ipo;
  try {
    ipo = await getIpoBySymbol(symbol);
  } catch (err) {
    if (err instanceof IPOProviderError) {
      console.error('[api/ipos/:symbol] provider error:', err.message, err.cause ?? '');
      return NextResponse.json(
        { error: 'IPO data is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    throw err;
  }

  if (!ipo) {
    return NextResponse.json({ error: 'IPO not found.' }, { status: 404 });
  }

  return NextResponse.json({ data: ipo });
}
