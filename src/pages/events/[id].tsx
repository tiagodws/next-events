import { Event, PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import { EventDetail } from '../../components/events';
import { Alert, Loading } from '../../components/ui';

type EventDetailPageProps = {
  event: Event;
};

const EventDetailPage: FC<EventDetailPageProps> = (props) => {
  const { event } = props;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto">
      {!id && <Loading />}

      {!event && id && (
        <Alert message="This event does not exist!" type="error" />
      )}

      {event && <EventDetail {...event} />}
    </div>
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
  const id = await prisma.event.findMany({ select: { id: true } });
  const paths = id.map((event) => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetailPage;
