import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/events');
  }, [router]);
};

export default HomePage;
