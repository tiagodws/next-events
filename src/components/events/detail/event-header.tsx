import { Event } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';
import { EventLogistics } from '../event-logistics';

type EventHeaderProps = {
  event: Event;
};

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { title, imageUrl, date, location } = props.event;

  return (
    <div className="w-full">
      <div className="relative w-full rounded-lg shadow-xl h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full"
          width={400}
          height={200}
        />
      </div>

      <div>
        <h1 className="text-5xl prose-h1 font-bold pb-8 mt-8">{title}</h1>

        <EventLogistics date={date} location={location} />
      </div>
    </div>
  );
};
