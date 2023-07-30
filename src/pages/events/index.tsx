import { EventList, EventSearch } from '@/components/events';
import { getAllEvents } from '@/data/dummy-data';
import { useRouter } from 'next/router';

const EventListPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex-none mb-8">
          <EventSearch onSearch={onSearchHandler} />
        </div>

        <div className="flex-1">
          <EventList items={events} />
        </div>
      </div>
    </div>
  );
};

export default EventListPage;
