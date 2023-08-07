import { EventForm } from '@/components/events';
import { toast } from '@/components/ui';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

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

const createEvent = async (url: string, { arg }: { arg: SchemaType }) => {
  const res = await fetch(url, {
    method: 'POST',
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

const EventCreatePage: FC = () => {
  const router = useRouter();
  const { trigger } = useSWRMutation(`/api/events`, createEvent);

  const onSubmitHandler: SubmitHandler<SchemaType> = async (data) => {
    try {
      const eventData = await trigger(data);
      router.push(`/event/${eventData.data?.slug}`);
    } catch (err: any) {
      toast({ message: err.message, statusType: 'error' });
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <EventForm onSubmit={onSubmitHandler} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: `/`, permanent: false },
    };
  }

  return {
    props: {},
  };
};

export default EventCreatePage;
