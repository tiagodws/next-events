import { redirect } from 'next/navigation';
import type { FC } from 'react';

const HomePage: FC = async () => {
  redirect('/featured');
};

export default HomePage;
