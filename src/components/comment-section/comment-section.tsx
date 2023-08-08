import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationRequest,
} from '@/types';
import type { Error } from '@/types/error';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { Comment } from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { format as timeAgoFormat } from 'timeago.js';
import { Button, toast } from '../ui';
import { CommentForm } from './comment-form';

type CommentSectionProps = {
  eventId: string;
  initialCommentData: PaginatedApiResponse<Comment[]>;
};

const deleteComment = async (
  url: string,
  { arg }: { arg: string }
): Promise<ApiResponse<Comment>> => {
  const res = await fetch(`${url}/${arg}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ApiResponse<Comment> = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message);
  }

  return data;
};

export const CommentSection: FC<CommentSectionProps> = (props) => {
  const { eventId, initialCommentData } = props;
  const { status } = useSession();
  const [pagination] = useState<PaginationRequest>(
    initialCommentData.metadata?.pagination ?? { pageNumber: 1, pageSize: 10 }
  );
  const [commentData, setCommentData] =
    useState<PaginatedApiResponse<Comment[]>>(initialCommentData);
  const [mutatingId, setMutatingId] = useState<string | null>(null);
  const queryParams = `pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
  const url = `/api/events/${eventId}/comments`;
  const { trigger } = useSWRMutation(
    `/api/events/${eventId}/comments`,
    deleteComment
  );

  const { data, isValidating } = useSWR<PaginatedApiResponse<Comment[]>>(
    url,
    (url) => fetch(`${url}?${queryParams}`).then((res) => res.json())
  );

  const onDeleteHandler = async (id: string): Promise<void> => {
    try {
      setMutatingId(id);
      await trigger(id);
    } catch (err) {
      toast({ message: (err as Error).message, statusType: 'error' });
    }

    setMutatingId(null);
  };

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
            <div className="flex justify-center w-full">
              <div className="flex-1">
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

              {status === 'authenticated' && (
                <Button
                  className="ml-4 w-8"
                  statusType="error"
                  size="xs"
                  onClick={() => onDeleteHandler(comment.id)}
                  isLoading={mutatingId === comment.id}
                >
                  <TrashIcon strokeWidth={2} className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="mt-2 prose max-w-none">{comment.content}</div>
          </div>
        );
      })}
    </div>
  );
};
