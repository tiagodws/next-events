import { useRouter } from 'next/router';

const EventDetailPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <div>
      <h1>Event detail page: {id}</h1>
    </div>
  );
};

export default EventDetailPage;
