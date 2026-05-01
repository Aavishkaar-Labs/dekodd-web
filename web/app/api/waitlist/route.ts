import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof body === 'object' && body !== null && 'email' in body
    ? (body as { email: unknown }).email
    : undefined;

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  // TODO: persist email to database / mailing list provider
  console.log('[waitlist] new signup:', email.trim());

  return NextResponse.json({ success: true }, { status: 201 });
}
