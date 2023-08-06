import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import type { Event } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { EventLogistics } from '../event-logistics';

type EventListItemProps = {
  event: Event;
};

export const EventListItem: FC<EventListItemProps> = (props) => {
  const { slug, title, imageUrl, date, location, isFeatured } = props.event;
  const detailLink = `/events/${slug}`;

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
