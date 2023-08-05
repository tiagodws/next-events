import { EventDetail } from '@/components/events';
import { Loading } from '@/components/ui';
import { getComments } from '@/lib/get-comments';
import { getEventById } from '@/lib/get-event-by-id';
import { getFeaturedEvents } from '@/lib/get-featured-events';
import { PaginatedApiResponse } from '@/types';
import { Comment, Event } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import { z } from 'zod';

type EventDetailPageProps = {
  event: Event;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

const EventDetailPage: FC<EventDetailPageProps> = (props) => {
  const { event, initialCommentData } = props;

  return (
    <>
      <Head>
        <title>{event?.title}</title>
        <meta name="description" content={event?.description} />
      </Head>

      <div className="container mx-auto">
        {!event && <Loading />}

        {event && (
          <EventDetail event={event} initialCommentData={initialCommentData} />
        )}
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
  const validation = z.string().uuid().safeParse(id);

  if (!validation.success) {
    return { notFound: true };
  }

  const event = await getEventById(id);
  const [comments, commentsPagination] = await getComments(id);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event,
      initialCommentData: {
        data: comments,
        metadata: { pagination: commentsPagination },
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [events] = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
