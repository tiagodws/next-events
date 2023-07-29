import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <main lang="en" className={inter.className}>
      <h1>Hello World</h1>
    </main>
  );
}
