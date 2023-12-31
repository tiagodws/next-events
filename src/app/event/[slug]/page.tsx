import { getComments } from '@/lib/get-comments';
import { getEventBySlug } from '@/lib/get-event';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { z } from 'zod';
import { getFeaturedEvents } from '../../../lib/get-featured-events';
import ClientEventPage, { type ClientEventPageProps } from './client-page';

type EventPageProps = {
  params: {
    slug?: string;
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
    notFound();
  }

  const event = await getEventBySlug(validation.data);

  if (!event) {
    notFound();
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

export const generateStaticParams = async (): Promise<EventPageProps[]> => {
  const [events] = await getFeaturedEvents();
  return events.map((event) => ({ params: { slug: event.slug } }));
};

export const generateMetadata = async (
  props: EventPageProps
): Promise<Metadata> => {
  const { event } = await getStaticProps(props);
  return { title: event.title };
};

export const dynamicParams = true;
export const revalidate = 10;

export default EventPage;
