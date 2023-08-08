'use client';

import { EventDetail } from '@/components/events';
import type { PaginatedApiResponse } from '@/types';
import type { Comment, Event } from '@prisma/client';
import type { FC } from 'react';

export type ClientEventPageProps = {
  event: Event;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

const ClientEventPage: FC<ClientEventPageProps> = (props) => {
  const { event, initialCommentData } = props;

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <EventDetail event={event} initialCommentData={initialCommentData} />
    </div>
  );
};

export default ClientEventPage;
