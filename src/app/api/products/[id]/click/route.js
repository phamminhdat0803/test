import { NextResponse } from 'next/server';
import { incrementClick } from '@/lib/products';

export async function POST(_req, { params }) {
  await incrementClick(params.id);
  return NextResponse.json({ id: params.id });
}
