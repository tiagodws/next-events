import { Event, PrismaClient } from '@prisma/client';
import { format, lastDayOfMonth, set } from 'date-fns';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { EventList, EventSearch } from '../../components/events';
import { Alert } from '../../components/ui';

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

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {
            <>
              <div className="flex-none mb-8">
                <EventSearch
                  onSearch={onSearchHandler}
                  defaultYear={search?.year}
                  defaultMonth={search?.month}
                />
              </div>

              <div className="flex-1">
                {isInvalidSearch && (
                  <Alert
                    statusType="error"
                    message="Invalid search parameters!"
                  />
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
          }
        </div>
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

  const date = new Date(yearNumber, monthNumber - 1);
  const dateMin = set(date, {
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const dateMax = set(date, {
    date: lastDayOfMonth(date).getDate(),
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
  });

  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    where: { date: { gte: dateMin, lte: dateMax } },
  });

  return {
    props: { events, search: { year, month } },
  };
};

export default EventSearchPage;
