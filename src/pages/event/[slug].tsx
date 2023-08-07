import { EventDetail } from '@/components/events';
import { Loading } from '@/components/ui';
import { getComments } from '@/lib/get-comments';
import { getEventBySlug } from '@/lib/get-event';
import { getFeaturedEvents } from '@/lib/get-featured-events';
import type { PaginatedApiResponse } from '@/types';
import type { Comment, Event } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import type { FC } from 'react';
import { z } from 'zod';

type EventPageProps = {
  event: Event;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

const EventPage: FC<EventPageProps> = (props) => {
  const { event, initialCommentData } = props;

  return (
    <>
      <Head>
        <title>{event?.title}</title>
        <meta name="description" content={event?.description} />
      </Head>

      <div className="container max-w-3xl mx-auto px-4">
        {!event && <Loading />}

        {event && (
          <EventDetail event={event} initialCommentData={initialCommentData} />
        )}
      </div>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<EventPageProps> = async (
  context
) => {
  const { slug } = context.params as Params;
  const validation = z.string().safeParse(slug);

  if (!validation.success) {
    return { notFound: true };
  }

  const event = await getEventBySlug(validation.data);

  if (!event) {
    return { notFound: true };
  }

  const [comments, commentsPagination] = await getComments(event?.id);

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
  const paths = events.map((event) => ({ params: { slug: event.slug } }));

  return {
    paths,
    fallback: true,
  };
};

export default EventPage;
