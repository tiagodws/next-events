import type { ApiResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Comment } from '@prisma/client';
import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { Input, TextArea } from '../inputs';
import { Button } from '../ui';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  content: z.string().min(1),
});

type CommentFormData = z.infer<typeof formSchema>;

const postComment = async (
  url: string,
  { arg }: { arg: CommentFormData }
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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(formSchema),
  });
  const { trigger, isMutating } = useSWRMutation(
    `/api/events/${eventId}/comments`,
    postComment
  );

  const onSubmitHandler: SubmitHandler<CommentFormData> = async (data) => {
    await trigger(data);
    setValue('content', '');
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-6">
          <Input
            id="email"
            label="E-mail"
            type="email"
            error={errors.email}
            isDisabled={isMutating}
            register={register('email')}
          />
        </div>

        <div className="col-span-6">
          <Input
            id="name"
            label="Name"
            error={errors.name}
            isDisabled={isMutating}
            register={register('name')}
          />
        </div>

        <div className="col-span-12">
          <TextArea
            id="content"
            label="Comment"
            placeholder="Write your comment..."
            error={errors.content}
            isDisabled={isMutating}
            register={register('content')}
          />
        </div>

        <div className="hidden sm:block col-span-6" />

        <Button
          type="submit"
          isLoading={isMutating}
          className="btn-secondary col-span-12 sm:col-span-6 mt-2"
        >
          Comment
        </Button>
      </div>
    </form>
  );
};
