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
  const pageNumber = getPageNumber(props);
  const [events, pagination] = await getEvents({ pageNumber });

  return { events, pagination };
};

export const generateStaticParams = async (): Promise<EventsPageProps[]> => {
  return [
    { params: { slug: [''] } },
    { params: { slug: ['1'] } },
    { params: { slug: ['2'] } },
  ];
};

export const generateMetadata = async (
  props: EventsPageProps
): Promise<Metadata> => {
  const pageNumber = getPageNumber(props);

  return {
    title: `All events - Page ${pageNumber}`,
  };
};

const getPageNumber = (props: EventsPageProps): number => {
  const slug = props.params.slug;
  const page = slug?.[0];
  return Number(page) || 1;
};

export const dynamicParams = true;
export const revalidate = 10;

export default EventsPage;
