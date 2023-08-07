import { EventList, EventSearch } from '@/components/events';
import { Alert, Loading } from '@/components/ui';
import { getMonthEvents } from '@/lib/get-month-events';
import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import { add, format, sub } from 'date-fns';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC } from 'react';

type EventSearchPageProps = {
  events?: Event[];
  pagination?: Pagination;
  search?: {
    year: string;
    month: string;
  };
  isInvalidSearch?: boolean;
};

const EventSearchPage: FC<EventSearchPageProps> = (props) => {
  const { events, pagination, search, isInvalidSearch } = props;
  const router = useRouter();
  const { isFallback } = router;
  const displayDate =
    search &&
    format(new Date(Number(search.year), Number(search.month)), 'MMMM yyyy');

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/event-search/${year}/${month}`;
    router.push(fullPath);
  };

  const onPageChangeHandler = (pageNumber: number) => {
    const fullPath = `/event-search/${search?.year}/${search?.month}/${pageNumber}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>Event search</title>
        <meta
          name="description"
          content={
            displayDate
              ? `All events happening in ${displayDate}.`
              : `Search for events happening in specific months.`
          }
        />
      </Head>

      <div className="container max-w-lg mx-auto px-4">
        <div className="mb-8">
          <EventSearch
            onSearch={onSearchHandler}
            defaultYear={search?.year}
            defaultMonth={search?.month}
          />
        </div>

        {isFallback && <Loading />}

        {!isFallback && isInvalidSearch && (
          <Alert statusType="error" message="Invalid search parameters!" />
        )}

        {!isFallback && !isInvalidSearch && !events?.length && (
          <Alert
            statusType="default"
            message="No events found for the selected period."
          />
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

export const getStaticProps: GetStaticProps<EventSearchPageProps> = async (
  context
) => {
  const slug = context.params?.slug;
  const year = slug?.[0];
  const month = slug?.[1];
  const page = slug?.[2];
  const yearNumber = Number(year);
  const monthNumber = Number(month);
  const pageNumber = Number(page) || 1;

  const isValidYear =
    !!year && !isNaN(yearNumber) && yearNumber > 2020 && yearNumber < 2099;
  const isValidMonth =
    !!month && !isNaN(monthNumber) && monthNumber > 0 && monthNumber < 13;
  const isValidSearch = isValidYear && isValidMonth;

  if (!isValidSearch) {
    return {
      props: {
        events: [],
        pagination: {
          pageCount: 0,
          pageNumber: 0,
          pageSize: 0,
          totalCount: 0,
        },
        isInvalidSearch: true,
      },
    };
  }

  const [events, pagination] = await getMonthEvents(
    {
      monthNumber,
      yearNumber,
    },
    {
      pageNumber,
    }
  );

  return {
    props: { events, pagination, search: { year, month } },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const startDate = sub(new Date(), { months: 1 });
  const paths = Array.from({ length: 6 }, (_, i) => {
    const date = add(startDate, { months: i });
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return { params: { slug: [year.toString(), month.toString()] } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default EventSearchPage;
