import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Affiliate</h1>
      <nav className="mt-4 space-x-4">
        <Link href="/products">Products</Link>
        <Link href="/about">About Us</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </main>
  );
}
