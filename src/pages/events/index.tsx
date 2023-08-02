import { EventList, EventSearch } from '@/components/events';
import { Event, PrismaClient } from '@prisma/client';
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
        <title>NextJS Events - All events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
      </Head>

      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex-none mb-8">
            <EventSearch onSearch={onSearchHandler} />
          </div>

          <div className="flex-1">
            <EventList items={events} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<EventListPageProps> = async () => {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();

  return {
    props: { events },
    revalidate: 60,
  };
};

export default EventListPage;
