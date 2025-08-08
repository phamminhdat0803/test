import './globals.css';

export const metadata = {
  title: 'Affiliate App',
  description: 'Affiliate products listing platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
