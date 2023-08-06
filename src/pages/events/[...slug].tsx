import { Event } from '@prisma/client';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { EventList, EventSearch } from '../../components/events';
import { Alert } from '../../components/ui';
import { getMonthEvents } from '../../lib/get-month-events';

type EventSearchPageProps = {
  events: Event[];
  search?: {
    year: string;
    month: string;
  };
  isInvalidSearch?: boolean;
};

const EventSearchPage: FC<EventSearchPageProps> = (props) => {
  const { events, search, isInvalidSearch } = props;
  const router = useRouter();
  const displayDate =
    search &&
    format(new Date(Number(search.year), Number(search.month)), 'MMMM yyyy');

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
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

        {isInvalidSearch && (
          <Alert statusType="error" message="Invalid search parameters!" />
        )}

        {!isInvalidSearch && !events.length && (
          <Alert
            statusType="default"
            message="No events found for the selected period."
          />
        )}

        {!!events.length && <EventList items={events} />}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  EventSearchPageProps
> = async (context) => {
  const slug = context.params?.slug;
  const year = slug?.[0];
  const month = slug?.[1];
  const yearNumber = Number(year);
  const monthNumber = Number(month);

  const isValidYear =
    !!year && !isNaN(yearNumber) && yearNumber > 2020 && yearNumber < 2099;
  const isValidMonth =
    !!month && !isNaN(monthNumber) && monthNumber > 0 && monthNumber < 13;
  const isValidSearch = isValidYear && isValidMonth;

  if (!isValidSearch) {
    return { props: { events: [], isInvalidSearch: true } };
  }

  const [events] = await getMonthEvents({ monthNumber, yearNumber });

  return {
    props: { events, search: { year, month } },
  };
};

export default EventSearchPage;
