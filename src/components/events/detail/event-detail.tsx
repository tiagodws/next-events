import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FC } from 'react';

type EventDetailProps = {
  title: string;
  imageUrl: string;
  date: Date;
  location: string;
  description: string;
};

export const EventDetail: FC<EventDetailProps> = (props) => {
  const { title, imageUrl, date, location, description } = props;
  const displayDate = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="hero ">
      <div className="hero-content flex-col">
        <div className="relative w-full rounded-lg shadow-2xl h-40 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full"
            width={400}
            height={200}
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold pb-4 mt-4">{title}</h1>

          <div className="pb-4">
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

          <p className="pb-4 prose">{description}</p>
        </div>
      </div>
    </div>
  );
};
