import type { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import type { FC } from 'react';
import { Paginator } from '../../ui';
import { EventListItem } from './event-list-item';

type EventListProps = {
  items: Event[];
  pagination?: Pagination;
  buildPageUrl?: (pageNumber: number) => string;
};

export const EventList: FC<EventListProps> = (props) => {
  const { items, pagination, buildPageUrl } = props;

  return (
    <div>
      <ul className="w-full">
        {items.map((event) => (
          <li key={event.id} className="mb-4">
            <EventListItem event={event} />
          </li>
        ))}
      </ul>

      {pagination && pagination.pageCount > 1 && (
        <div className="max-w-xs mx-auto mt-8">
          <Paginator pagination={pagination} buildPageUrl={buildPageUrl} />
        </div>
      )}
    </div>
  );
};
