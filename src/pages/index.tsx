import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const HomePage = () => {
  return (
    <main lang="en" className={inter.className} data-theme="light">
      <h1>Home Page</h1>
    </main>
  );
};

export default HomePage;
