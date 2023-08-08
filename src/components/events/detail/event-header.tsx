import type { ApiResponse } from '@/types';
import type { Error } from '@/types/error';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Event } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import useSWRMutation from 'swr/mutation';
import { Button, toast } from '../../ui';
import { EventLogistics } from '../event-logistics';

type EventHeaderProps = {
  event: Event;
};

const deleteEvent = async (
  url: string,
  { arg }: { arg: string }
): Promise<ApiResponse<Event>> => {
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

  const onDeleteHandler = async (): Promise<void> => {
    try {
      await trigger(id);
      router.push(`/`);
    } catch (err) {
      toast({ message: (err as Error).message, statusType: 'error' });
    }
  };

  const onEditHandler = (): void => {
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
        <div className="absolute right-0 top-0 p-4 flex w-80 min-w-0 max-w-full overflow-hidden">
          <Button
            className="btn-error flex-1"
            onClick={onDeleteHandler}
            isLoading={isMutating}
          >
            <TrashIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:block">Delete</span>
          </Button>

          <Button className="btn-accent flex-1 ml-2" onClick={onEditHandler}>
            <PencilIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:block">Edit</span>
          </Button>
        </div>
      )}
    </div>
  );
};
