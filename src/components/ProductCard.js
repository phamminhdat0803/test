'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from './ui/button';

export default function ProductCard({ product }) {
  const handleClick = () => {
    fetch(`/api/products/${product.id}/click`, { method: 'POST' });
  };

  useEffect(() => {
    fetch(`/api/products/${product.id}/view`, { method: 'POST' });
  }, [product.id]);

  return (
    <div className="border rounded p-4 space-y-2">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="font-bold">{product.price}</p>
      <p className="text-xs text-gray-500">Views: {product.views} | Clicks: {product.clicks}</p>
      <Link href={product.link} target="_blank">
        <Button onClick={handleClick} className="mt-2">View Product</Button>
      </Link>
    </div>
  );
}
