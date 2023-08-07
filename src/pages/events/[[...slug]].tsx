import { EventList, EventSearch } from '@/components/events';
import { Alert, Loading } from '@/components/ui';
import { getEvents } from '@/lib/get-events';
import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC } from 'react';

type EventsPageProps = {
  events?: Event[];
  pagination?: Pagination;
};

const EventsPage: FC<EventsPageProps> = (props) => {
  const { events, pagination } = props;
  const router = useRouter();
  const { isFallback } = router;

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/event-search/${year}/${month}`;
    router.push(fullPath);
  };

  const onPageChangeHandler = (pageNumber: number) => {
    const fullPath = `/events/${pageNumber}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>Next Events - All events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
      </Head>

      <div className="container max-w-lg mx-auto px-4">
        <div className="mb-8">
          <EventSearch onSearch={onSearchHandler} />
        </div>

        {isFallback && <Loading />}

        {!isFallback && !events?.length && (
          <Alert statusType="default" message="No events found." />
        )}

        {!isFallback && !!events?.length && !!pagination && (
          <EventList
            items={events}
            pagination={pagination}
            onPageChange={onPageChangeHandler}
          />
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async (
  context
) => {
  const slug = context.params?.slug;
  const page = slug?.[0];
  const pageNumber = Number(page) || 1;

  const [events, pagination] = await getEvents({ pageNumber });

  return {
    props: { events, pagination },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { slug: [''] } },
    { params: { slug: ['1'] } },
    { params: { slug: ['2'] } },
  ];

  return {
    paths,
    fallback: true,
  };
};

export default EventsPage;
