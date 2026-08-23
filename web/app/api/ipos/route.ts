import { NextRequest, NextResponse } from 'next/server';
import { getAllIpos, IPOProviderError } from '@/lib/ipo/finApiProvider';
import type { IPOStatus } from '@/lib/ipo/types';

const VALID_STATUSES: IPOStatus[] = ['UPCOMING', 'OPEN', 'CLOSED'];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status')?.toUpperCase();
  const query = searchParams.get('q')?.trim().toLowerCase();

  let ipos;
  try {
    ipos = await getAllIpos();
  } catch (err) {
    if (err instanceof IPOProviderError) {
      // Don't leak upstream error details to the client — log server-side, return a generic message.
      console.error('[api/ipos] provider error:', err.message, err.cause ?? '');
      return NextResponse.json(
        { error: 'IPO data is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    throw err;
  }

  if (statusParam) {
    if (!VALID_STATUSES.includes(statusParam as IPOStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Expected one of: ${VALID_STATUSES.join(', ')}.` },
        { status: 400 }
      );
    }
    ipos = ipos.filter((ipo) => ipo.status === statusParam);
  }

  if (query) {
    ipos = ipos.filter(
      (ipo) => ipo.name.toLowerCase().includes(query) || ipo.symbol.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ data: ipos, count: ipos.length });
}
