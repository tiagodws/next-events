import { Event, PrismaClient } from '@prisma/client';
import { lastDayOfMonth, set } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { EventList, EventSearch } from '../../components/events';
import { Alert, Loading } from '../../components/ui';

const getIsValidSearch = (year: number, month: number) => {
  const isValidYear = !isNaN(year) && year > 2020 && year < 2099;
  const isValidMonth = !isNaN(month) && month > 0 && month < 13;
  return isValidYear && isValidMonth;
};

type EventSearchPageProps = {
  events: Event[];
  isInvalid?: boolean;
};

const EventSearchPage: FC<EventSearchPageProps> = (props) => {
  const { events } = props;
  const router = useRouter();
  const searchData = router.query.slug;

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  const isLoading = !searchData;
  const year = Number(searchData?.[0]);
  const month = Number(searchData?.[1]);
  const isValidSearch = getIsValidSearch(year, month);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <div className="flex-none mb-8">
              <EventSearch
                onSearch={onSearchHandler}
                defaultYear={searchData?.[0]}
                defaultMonth={searchData?.[1]}
              />
            </div>

            <div className="flex-1">
              {!isValidSearch && (
                <Alert type="error" message="Invalid search parameters!" />
              )}

              {isValidSearch && !events.length && (
                <Alert
                  type="default"
                  message="No events found for the selected period."
                />
              )}

              {isValidSearch && !!events.length && <EventList items={events} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  EventSearchPageProps
> = async (context) => {
  const slug = context.params?.slug;
  const year = Number(slug?.[0]);
  const month = Number(slug?.[1]);
  const isValidSearch = getIsValidSearch(year, month);

  if (!isValidSearch) {
    return { props: { events: [], isInvalid: true } };
  }

  const date = new Date(year, month - 1);
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
    props: { events },
  };
};

export default EventSearchPage;
