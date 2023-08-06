import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { EventLogistics } from '../event-logistics';

type EventListItemProps = {
  id: string;
  title: string;
  imageUrl: string;
  date: Date;
  location: string;
  isFeatured: boolean;
};

export const EventListItem: FC<EventListItemProps> = (props) => {
  const { id, title, imageUrl, date, location, isFeatured } = props;
  const detailLink = `/events/${id}`;

  return (
    <Link
      href={detailLink}
      className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <figure className="relative overflow-hidden rounded-t-none h-20">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full"
          width={200}
          height={80}
        />
      </figure>

      <div className="card-body">
        <div className="flex items-center">
          <h2 className="flex-1 card-title mr-2 prose">
            {title}

            {isFeatured && (
              <div className="tooltip" data-tip="This is a featured event">
                <SparklesIcon className="w-5 h-5 text-primary tooltip" />
              </div>
            )}
          </h2>
          <div className="flex-0">
            <ChevronRightIcon
              strokeWidth={3}
              className="h-6 w-6 text-primary"
            />
          </div>
        </div>

        <EventLogistics date={date} location={location} />
      </div>
    </Link>
  );
};
