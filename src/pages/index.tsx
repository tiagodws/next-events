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
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex-none mb-8">
            <NewsletterForm />
          </div>

          <div className="flex-1">
            <EventList items={events} />
          </div>
        </div>
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
