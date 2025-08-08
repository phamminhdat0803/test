import { NextResponse } from 'next/server';
import { incrementView } from '@/lib/products';

export async function POST(_req, { params }) {
  await incrementView(params.id);
  return NextResponse.json({ id: params.id });
}
