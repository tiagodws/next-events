import { useRouter } from 'next/router';
import { EventHeader } from '../../components/events';
import { Alert, Loading } from '../../components/ui';
import { getEventById } from '../../data/dummy-data';

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const event = getEventById(id as string);

  return (
    <div className="container mx-auto">
      {!id && <Loading />}

      {!event && id && (
        <Alert message="This event does not exist!" type="error" />
      )}

      {event && <EventHeader {...event} />}
    </div>
  );
};

export default EventDetailPage;
