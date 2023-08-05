import { PaginatedApiResponse, PaginationRequest } from '@/types';
import { Comment } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';

type CommentSectionProps = {
  eventId: string;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

export const CommentSection: FC<CommentSectionProps> = (props) => {
  const { eventId, initialCommentData } = props;
  const [pagination, setPagination] = useState<PaginationRequest>(
    initialCommentData.metadata.pagination
  );
  const [commentData, setCommentData] =
    useState<PaginatedApiResponse<Comment[]>>(initialCommentData);
  const url = `/api/events/${eventId}/comments?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;

  const { data, error, isLoading } = useSWR<PaginatedApiResponse<Comment[]>>(
    url,
    () => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setCommentData(data);
    }
  }, [data]);

  return (
    <div className="chat chat-start">
      <div className="chat-bubble chat-bubble-primary">
        What kind of nonsense is this
      </div>
    </div>
  );
};
