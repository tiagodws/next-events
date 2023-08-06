import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Event } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';

type EventHeaderProps = {
  event: Event;
};

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { title, imageUrl, date, location } = props.event;
  const displayDate = format(new Date(date), 'E, dd MMMM yyyy');

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

        <div>
          <div className="flex items-center">
            <div className="flex-0 mr-1">
              <CalendarIcon strokeWidth={2} className="h-5 w-5" />
            </div>
            <p className="flex-1 prose prose-sm">{displayDate}</p>
          </div>

          <div className="flex items-center">
            <div className="flex-0 mr-1">
              <MapPinIcon strokeWidth={2} className="h-5 w-5" />
            </div>
            <p className="flex-1 prose prose-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
