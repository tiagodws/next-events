import type { Event } from '@/data/dummy-data';
import { FC } from 'react';
import { EventListItem } from './event-list-item';

type EventListProps = {
  items: Event[];
};

export const EventList: FC<EventListProps> = (props) => {
  const { items } = props;

  return (
    <ul className="flex flex-col items-center">
      {items.map((event) => (
        <li key={event.id} className="mb-4">
          <EventListItem {...event} />
        </li>
      ))}
    </ul>
  );
};
