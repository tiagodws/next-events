import { EventDetail } from '@/components/events';
import { Loading } from '@/components/ui';
import { getComments } from '@/lib/get-comments';
import { getEventBySlug } from '@/lib/get-event';
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

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (
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

export default EventDetailPage;
