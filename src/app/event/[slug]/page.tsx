import { getComments } from '@/lib/get-comments';
import { getEventBySlug } from '@/lib/get-event';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { z } from 'zod';
import ClientEventPage, { type ClientEventPageProps } from './client-page';

type EventPageProps = {
  params: {
    slug?: string[];
  };
};

const EventPage: FC<EventPageProps> = async (props) => {
  const clientPageProps = await getStaticProps(props);
  return <ClientEventPage {...clientPageProps} />;
};

const getStaticProps = async (
  props: EventPageProps
): Promise<ClientEventPageProps> => {
  const { slug } = props.params;
  const validation = z.string().safeParse(slug);

  if (!validation.success) {
    return notFound();
  }

  const event = await getEventBySlug(validation.data);

  if (!event) {
    return notFound();
  }

  const [comments, commentsPagination] = await getComments(event?.id);

  return {
    event,
    initialCommentData: {
      data: comments,
      metadata: { pagination: commentsPagination },
    },
  };
};

export const metadata: Metadata = {
  title: 'Next Events - Event',
};

export default EventPage;
