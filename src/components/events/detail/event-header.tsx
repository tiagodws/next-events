import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import useSWRMutation from 'swr/mutation';
import { Button, toast } from '../../ui';
import { EventLogistics } from '../event-logistics';

type EventHeaderProps = {
  event: Event;
};

const deleteEvent = async (url: string, { arg }: { arg: string }) => {
  const res = await fetch(`${url}/${arg}`, {
    method: 'DELETE',
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

export const EventHeader: FC<EventHeaderProps> = (props) => {
  const { id, title, imageUrl, date, location } = props.event;
  const { status } = useSession();
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(`/api/events`, deleteEvent);

  const onDeleteHandler = async () => {
    try {
      await trigger(id);
      router.push(`/`);
    } catch (err: any) {
      toast({ message: err.message, statusType: 'error' });
    }
  };

  const onEditHandler = () => {
    router.push(`/event/${props.event.slug}/edit`);
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full rounded-lg shadow-xl h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full"
          width={400}
          height={200}
        />
      </div>

      <div>
        <h1 className="text-5xl prose-h1 font-bold pb-8 mt-8">{title}</h1>

        <EventLogistics date={date} location={location} />
      </div>

      {status === 'authenticated' && (
        <div className="absolute left-0 top-0 p-4">
          <Button
            className="btn-error"
            onClick={onDeleteHandler}
            isLoading={isMutating}
          >
            Delete
          </Button>
        </div>
      )}

      {status === 'authenticated' && (
        <div className="absolute right-0 top-0 p-4">
          <Button className="btn-accent" onClick={onEditHandler}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
