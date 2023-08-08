'use client';

import { EventList } from '@/components/events';
import { NewsletterForm } from '@/components/newsletter-form';
import { Alert } from '@/components/ui';
import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import type { FC } from 'react';

export type ClientFeaturedPageProps = {
  events: Event[];
  pagination: Pagination;
};

const ClientFeaturedPage: FC<ClientFeaturedPageProps> = (props) => {
  const { events, pagination } = props;

  const buildPageUrl = (pageNumber: number): string => {
    return `/featured/${pageNumber}`;
  };

  return (
    <div className="container max-w-lg mx-auto px-4">
      <div className="mb-8">
        <NewsletterForm />
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

export default ClientFeaturedPage;
