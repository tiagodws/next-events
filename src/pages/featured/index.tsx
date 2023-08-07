import { EventList } from '@/components/events';
import { NewsletterForm } from '@/components/newsletter-form';
import { getFeaturedEvents } from '@/lib/get-featured-events';
import { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import type { GetStaticProps } from 'next';
import type { FC } from 'react';

type HomePageProps = {
  events: Event[];
  pagination: Pagination;
};

const HomePage: FC<HomePageProps> = (props) => {
  const { events, pagination } = props;

  const buildPageUrl = (pageNumber: number) => {
    return `/featured/${pageNumber}`;
  };

  return (
    <div className="container max-w-lg mx-auto px-4">
      <div className="mb-8">
        <NewsletterForm />
      </div>

      <EventList
        items={events}
        pagination={pagination}
        buildPageUrl={buildPageUrl}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [events, pagination] = await getFeaturedEvents();

  return {
    props: { events, pagination },
    revalidate: 60,
  };
};

export default HomePage;
