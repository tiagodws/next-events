'use client';

import { EventList, EventSearch } from '@/components/events';
import { Alert } from '@/components/ui';
import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export type ClientEventSearchPageProps = {
  events?: Event[];
  pagination?: Pagination;
  search?: {
    year: string;
    month: string;
  };
  isInvalidSearch?: boolean;
};

const ClientEventSearchPage: FC<ClientEventSearchPageProps> = (props) => {
  const { events, pagination, search, isInvalidSearch } = props;
  const router = useRouter();

  const onSearchHandler = (year: string, month: string): void => {
    const fullPath = `/event-search/${year}/${month}`;
    router.push(fullPath);
  };

  const buildPageUrl = (pageNumber: number): string => {
    return `/event-search/${search?.year}/${search?.month}/${pageNumber}`;
  };

  return (
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

      {!isInvalidSearch && !events?.length && (
        <Alert statusType="default" message="No events found." />
      )}

      {!!events?.length && !!pagination && (
        <EventList
          items={events}
          pagination={pagination}
          buildPageUrl={buildPageUrl}
        />
      )}
    </div>
  );
};

export default ClientEventSearchPage;
