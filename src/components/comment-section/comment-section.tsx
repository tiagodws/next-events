import { PaginatedApiResponse, PaginationRequest } from '@/types';
import { Comment } from '@prisma/client';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { format as timeAgoFormat } from 'timeago.js';
import { CommentForm } from './comment-form';

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
  const queryParams = `pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
  const url = `/api/events/${eventId}/comments`;

  const { data, isValidating } = useSWR<PaginatedApiResponse<Comment[]>>(
    url,
    (url) => fetch(`${url}?${queryParams}`).then((res) => res.json())
  );

  const progressClasses = isValidating ? 'opacity-30' : 'opacity-0';

  useEffect(() => {
    if (data) {
      setCommentData(data);
    }
  }, [data]);

  return (
    <div>
      <CommentForm eventId={eventId} />
      <progress
        className={`progress h-1 w-full mt-5 transition-opacity duration-500 ${progressClasses}`}
      ></progress>

      {commentData.data?.map((comment) => {
        return (
          <div key={comment.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-sm font-bold">{comment.name}</span>

              <time
                className="text-xs opacity-50 ml-2 tooltip"
                data-tip={format(
                  new Date(comment.createdAt),
                  'E, dd MMM yyyy - HH:mm'
                )}
              >
                {timeAgoFormat(comment.createdAt)}
              </time>
            </div>

            <div className="prose max-w-none">{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
};
