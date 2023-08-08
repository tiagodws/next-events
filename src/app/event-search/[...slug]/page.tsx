import { getMonthEvents } from '@/lib/get-month-events';
import { add, sub } from 'date-fns';
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

export const generateStaticParams = async (): Promise<
  EventSearchPageProps[]
> => {
  const startDate = sub(new Date(), { months: 1 });
  return Array.from({ length: 6 }, (_, i) => {
    const date = add(startDate, { months: i });
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return { params: { slug: [year.toString(), month.toString()] } };
  });
};

export const dynamicParams = true;
export const revalidate = 10;
export const metadata: Metadata = {
  title: 'Next Events - Search events',
};

export default EventSearchPage;
