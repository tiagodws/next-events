import { EventList } from '@/components/events';
import { NewsletterForm } from '@/components/newsletter-form';
import { getFeaturedEvents } from '@/lib/get-featured-events';
import { Event } from '@prisma/client';
import { GetStaticProps } from 'next';
import { FC } from 'react';

type HomePageProps = {
  events: Event[];
};

const HomePage: FC<HomePageProps> = (props) => {
  const { events } = props;

  return (
    <>
      <div className="container max-w-lg mx-auto px-4">
        <div className="mb-8">
          <NewsletterForm />
        </div>

        <EventList items={events} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [events] = await getFeaturedEvents();

  return {
    props: { events },
    revalidate: 60,
  };
};

export default HomePage;
