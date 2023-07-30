import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FC } from 'react';

type EventHeaderProps = {
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  isFeatured: boolean;
};

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { title, image, date, location, description, isFeatured } = props;
  const displayDate = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="relative w-full lg:w-40 rounded-lg shadow-2xl h-40 lg:h-60 lg:mr-8 overflow-hidden">
          <Image src={image} alt={title} fill objectFit="cover" />
        </div>

        <div>
          <h1 className="text-5xl font-bold pb-4 sm:max-lg:mt-4">{title}</h1>

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
