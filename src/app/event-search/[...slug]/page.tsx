import { getMonthEvents } from '@/lib/get-month-events';
import type { PaginationRequest } from '@/types';
import { add, format, sub } from 'date-fns';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
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
  const { numericDates, paginationRequest, search } = getSearchValues(props);
  const [events, pagination] = await getMonthEvents(
    numericDates,
    paginationRequest
  );

  return { events, pagination, search };
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

export const generateMetadata = async (
  props: EventSearchPageProps
): Promise<Metadata> => {
  const { search, paginationRequest } = getSearchValues(props);
  const displayDate =
    search &&
    format(new Date(Number(search.year), Number(search.month)), 'MMMM yyyy');

  return {
    title: `Events in ${displayDate} - Page ${paginationRequest.pageNumber}`,
  };
};

const getSearchValues = (
  props: EventSearchPageProps
): {
  numericDates: { yearNumber: number; monthNumber: number };
  paginationRequest: Partial<PaginationRequest>;
  search: { year: string; month: string };
} => {
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
    redirect('/events-search');
  }

  return {
    numericDates: { yearNumber, monthNumber },
    paginationRequest: { pageNumber },
    search: { year, month },
  };
};

export const dynamicParams = true;
export const revalidate = 10;

export default EventSearchPage;
