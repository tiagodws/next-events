import {
  CalendarIcon,
  ChevronRightIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type EventListItemProps = {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
};

export const EventListItem: FC<EventListItemProps> = (props) => {
  const { id, title, image, date, location } = props;
  const detailLink = `/events/${id}`;
  const displayDate = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={detailLink}
      className="card card-compact w-96 bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <figure className="relative overflow-hidden rounded-t-none  h-20">
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      </figure>

      <div className="card-body">
        <div className="flex items-center">
          <h2 className="flex-1 card-title mr-2 prose">{title}</h2>
          <div className="flex-0">
            <ChevronRightIcon
              strokeWidth={3}
              className="h-6 w-6 text-primary"
            />
          </div>
        </div>

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
    </Link>
  );
};
