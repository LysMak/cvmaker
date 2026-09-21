import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fast CV Maker',
  description: 'Turn your CV into a beautiful website in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
