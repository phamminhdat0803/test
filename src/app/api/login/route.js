import { NextResponse } from 'next/server';
import { validateUser } from '@/lib/accounts';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await validateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json(user);
}
