import { Event, PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import { EventDetail } from '../../components/events';
import { Loading } from '../../components/ui';

type EventDetailPageProps = {
  event?: Event;
};

const EventDetailPage: FC<EventDetailPageProps> = (props) => {
  const { event } = props;

  return (
    <>
      <Head>
        <title>{event?.title}</title>
        <meta name="description" content={event?.description} />
      </Head>

      <div className="container mx-auto">
        {!event && <Loading />}

        {event && <EventDetail {...event} />}
      </div>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (
  context
) => {
  const { id } = context.params as Params;
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    return { notFound: true };
  }

  return {
    props: { event },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const id = await prisma.event.findMany({
    select: { id: true },
    where: { isFeatured: true },
  });
  const paths = id.map((event) => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
