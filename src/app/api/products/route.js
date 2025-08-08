import { NextResponse } from 'next/server';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/products';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  const data = await req.json();
  const product = await addProduct(data);
  return NextResponse.json(product);
}

export async function PUT(req) {
  const data = await req.json();
  const product = await updateProduct(data);
  return NextResponse.json(product);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await deleteProduct(id);
  return NextResponse.json({ id });
}
