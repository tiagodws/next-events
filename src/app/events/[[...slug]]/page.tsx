import { getEvents } from '@/lib/get-events';
import type { Metadata } from 'next';
import type { FC } from 'react';
import ClientEventPage, { type ClientEventPageProps } from './client-page';

type EventsPageProps = {
  params: {
    slug?: string[];
  };
};

const EventsPage: FC<EventsPageProps> = async (props) => {
  const clientPageProps = await getStaticProps(props);
  return <ClientEventPage {...clientPageProps} />;
};

const getStaticProps = async (
  props: EventsPageProps
): Promise<ClientEventPageProps> => {
  const slug = props.params.slug;
  const page = slug?.[0];
  const pageNumber = Number(page) || 1;

  const [events, pagination] = await getEvents({ pageNumber });

  return { events, pagination };
};

export const metadata: Metadata = {
  title: 'Next Events - All events',
};

export default EventsPage;
