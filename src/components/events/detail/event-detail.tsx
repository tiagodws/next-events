import type { PaginatedApiResponse } from '@/types';
import type { Comment, Event } from '@prisma/client';
import type { FC } from 'react';
import { CommentSection } from '../../comment-section';
import { EventHeader } from './event-header';

type EventDetailProps = {
  event: Event;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

export const EventDetail: FC<EventDetailProps> = (props) => {
  const { event, initialCommentData } = props;

  return (
    <div className="w-full">
      <EventHeader event={event} />

      <p className="mt-8 prose max-w-none">{event.description}</p>

      <div className="divider mt-8" />

      <div className="mt-8">
        <CommentSection
          eventId={event.id}
          initialCommentData={initialCommentData}
        />
      </div>
    </div>
  );
};
