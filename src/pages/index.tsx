import { Event, PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { EventList } from '../components/events';

type HomePageProps = {
  events: Event[];
};

const HomePage: FC<HomePageProps> = (props) => {
  const { events } = props;

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
      </Head>

      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex-1">
            <EventList items={events} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    where: { isFeatured: true },
  });

  return {
    props: { events },
    revalidate: 60,
  };
};

export default HomePage;
