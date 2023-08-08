import type { ApiResponse } from '@/types';
import type { Error } from '@/types/error';
import type { Comment } from '@prisma/client';
import type { FC } from 'react';
import { useRef, type FormEvent } from 'react';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { Button, toast } from '../ui';

const commentFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  content: z.string(),
});

type CommentFormSchema = z.infer<typeof commentFormSchema>;

const postComment = async (
  url: string,
  { arg }: { arg: CommentFormSchema }
): Promise<ApiResponse<Comment>> => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
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

type CommentFormProps = {
  eventId: string;
};

export const CommentForm: FC<CommentFormProps> = (props) => {
  const { eventId } = props;
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { trigger, isMutating } = useSWRMutation(
    `/api/events/${eventId}/comments`,
    postComment
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const content = contentRef.current?.value;
    const formData = { email, name, content };
    const result = commentFormSchema.safeParse(formData);

    if (!result.success) {
      toast({
        id: 'invalid-comment',
        message: 'Please fill in all the fields with valid information.',
        statusType: 'warning',
      });
      return;
    }

    try {
      await trigger(result.data);
      contentRef.current!.value = '';

      toast({
        id: 'comment-success',
        message: 'Comment added!',
        statusType: 'success',
      });
    } catch (err) {
      toast({
        id: 'comment-error',
        message: (err as Error).message,
        statusType: 'error',
      });
    }
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-4">
        <input
          id="email"
          className="input input-bordered col-span-6"
          placeholder="Email"
          type="email"
          ref={emailRef}
          disabled={isMutating}
        />

        <input
          id="name"
          className="input input-bordered col-span-6"
          placeholder="Name"
          ref={nameRef}
          disabled={isMutating}
        />

        <textarea
          id="content"
          className="textarea textarea-bordered col-span-12"
          placeholder="Write your comment..."
          ref={contentRef}
          disabled={isMutating}
        />

        <div className="hidden sm:block col-span-6" />

        <Button
          type="submit"
          isLoading={isMutating}
          className="btn-secondary col-span-12 sm:col-span-6"
        >
          Comment
        </Button>
      </div>
    </form>
  );
};
