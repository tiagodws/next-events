import { EventList, EventSearch } from '@/components/events';
import { getEvents } from '@/lib/get-events';
import { Event } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

type EventListPageProps = {
  events: Event[];
};

const EventListPage: FC<EventListPageProps> = (props) => {
  const { events } = props;
  const router = useRouter();

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>Next Events - All events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
      </Head>

      <div className="container max-w-lg mx-auto px-4">
        <div className="mb-8">
          <EventSearch onSearch={onSearchHandler} />
        </div>

        <EventList items={events} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<EventListPageProps> = async () => {
  const [events] = await getEvents();

  return {
    props: { events },
    revalidate: 60,
  };
};

export default EventListPage;
