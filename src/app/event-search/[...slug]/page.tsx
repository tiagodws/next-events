import { getMonthEvents } from '@/lib/get-month-events';
import type { Metadata } from 'next';
import type { FC } from 'react';
import ClientEventSearchPage, {
  type ClientEventSearchPageProps,
} from './client-page';

type EventSearchPageProps = {
  params: {
    slug?: string[];
  };
};

const EventSearchPage: FC<EventSearchPageProps> = async (props) => {
  const clientPageProps = await getStaticProps(props);
  return <ClientEventSearchPage {...clientPageProps} />;
};

const getStaticProps = async (
  props: EventSearchPageProps
): Promise<ClientEventSearchPageProps> => {
  const slug = props.params?.slug;
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
      events: [],
      pagination: {
        pageCount: 0,
        pageNumber: 0,
        pageSize: 0,
        totalCount: 0,
      },
      isInvalidSearch: true,
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

  return { events, pagination, search: { year, month } };
};

export const metadata: Metadata = {
  title: 'Next Events - Search events',
};

export default EventSearchPage;
