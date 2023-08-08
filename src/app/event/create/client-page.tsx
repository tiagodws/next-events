'use client';

import { EventForm, type EventFormData } from '@/components/events';
import { toast } from '@/components/ui';
import type { ApiResponse } from '@/types';
import type { Error } from '@/types/error';
import type { Event } from '@prisma/client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

const createEvent = async (
  url: string,
  { arg }: { arg: EventFormData }
): Promise<ApiResponse<Event>> => {
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

const ClientCreateEventPage: FC = () => {
  const router = useRouter();
  const { trigger } = useSWRMutation(`/api/events`, createEvent);

  const onSubmitHandler: SubmitHandler<EventFormData> = async (data) => {
    try {
      const eventData = await trigger(data);
      router.push(`/event/${eventData.data?.slug}`);
    } catch (err) {
      toast({ message: (err as Error).message, statusType: 'error' });
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <EventForm onSubmit={onSubmitHandler} />
    </div>
  );
};

export default ClientCreateEventPage;
