import { EventForm } from '@/components/events';
import { toast } from '@/components/ui';
import { getEventBySlug } from '@/lib/get-event';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import { type GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import type { FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

type EventEditPageProps = {
  event: Event;
};

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().url(),
  date: z.date().or(z.string()),
  isFeatured: z.boolean(),
});

type SchemaType = z.infer<typeof schema>;

const updateEvent = async (url: string, { arg }: { arg: SchemaType }) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ApiResponse<Event> = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message);
  }

  return data;
};

const EventEditPage: FC<EventEditPageProps> = (props) => {
  const { event } = props;
  const router = useRouter();
  const { trigger } = useSWRMutation(`/api/events/${event.id}`, updateEvent);

  const onSubmitHandler: SubmitHandler<SchemaType> = async (data) => {
    try {
      const updatedData = await trigger(data);
      router.push(`/event/${updatedData.data?.slug}`);
    } catch (err: any) {
      toast({ message: err.message, statusType: 'error' });
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <EventForm defaultValues={event} onSubmit={onSubmitHandler} />
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<
  EventEditPageProps
> = async (context) => {
  const session = await getSession(context);
  const { slug } = context.params as Params;
  const validation = z.string().safeParse(slug);

  if (!validation.success) {
    return { notFound: true };
  }

  const event = await getEventBySlug(validation.data);

  if (!event) {
    return { notFound: true };
  }

  if (!session) {
    return {
      redirect: { destination: `/event/${validation.data}`, permanent: false },
    };
  }

  return {
    props: {
      event,
    },
  };
};

export default EventEditPage;
