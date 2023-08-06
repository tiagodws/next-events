import { Event } from '@prisma/client';
import { FC } from 'react';
import { EventListItem } from './event-list-item';

type EventListProps = {
  items: Event[];
};

export const EventList: FC<EventListProps> = (props) => {
  const { items } = props;

  return (
    <ul className="w-full">
      {items.map((event) => (
        <li key={event.id} className="mb-4">
          <EventListItem event={event} />
        </li>
      ))}
    </ul>
  );
};
