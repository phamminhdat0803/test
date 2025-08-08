'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Admin' };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '', price: '', image: '', link: '' });

  const load = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ id: '', name: '', description: '', price: '', image: '', link: '' });
    load();
  };

  return (
    <div className="p-8 space-y-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-2">
        {['id','name','description','price','image','link'].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field} className="border p-2" />
        ))}
        <Button type="submit" className="col-span-6">Add Product</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
