'use client';

import { EventList, EventSearch } from '@/components/events';
import { Alert } from '@/components/ui';
import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export type ClientEventPageProps = {
  events: Event[];
  pagination: Pagination;
};

const ClientEventPage: FC<ClientEventPageProps> = (props) => {
  const { events, pagination } = props;
  const router = useRouter();

  const onSearchHandler = (year: string, month: string): void => {
    const fullPath = `/event-search/${year}/${month}`;
    router.push(fullPath);
  };

  const buildPageUrl = (pageNumber: number): string => {
    return `/events/${pageNumber}`;
  };
  return (
    <div className="container max-w-lg mx-auto px-4">
      <div className="mb-8">
        <EventSearch onSearch={onSearchHandler} />
      </div>

      {!events?.length && (
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

export default ClientEventPage;
