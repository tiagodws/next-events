import { getFeaturedEvents } from '@/lib/get-featured-events';
import type { GetStaticProps } from 'next';

const HomePage = () => {};

export const getStaticProps: GetStaticProps = async () => {
  const [events, pagination] = await getFeaturedEvents();

  return {
    redirect: { destination: '/featured', permanent: false },
  };
};

export default HomePage;
