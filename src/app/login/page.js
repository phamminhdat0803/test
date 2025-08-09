'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      window.location.href = '/';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-8 space-y-4">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2" />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
