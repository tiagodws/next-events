import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { FC } from 'react';

type EventLogisticsProps = {
  date: Date | string;
  location: string;
};

export const EventLogistics: FC<EventLogisticsProps> = (props) => {
  const { date, location } = props;
  const displayDate = format(new Date(date), 'E, dd MMMM yyyy');

  return (
    <div>
      <div className="flex items-center mb-2">
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
  );
};
