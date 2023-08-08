import type { ApiResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NewsletterSubscription } from '@prisma/client';
import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { Input } from '../inputs';
import { Button } from '../ui';

const formSchema = z.object({
  email: z.string().email(),
});

type NewsletterFormData = z.infer<typeof formSchema>;

const subscribe = async (
  url: string,
  { arg }: { arg: NewsletterFormData }
): Promise<ApiResponse<NewsletterSubscription>> => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ApiResponse<NewsletterSubscription> = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message);
  }

  return data;
};

export const NewsletterForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(formSchema),
  });
  const { trigger, isMutating } = useSWRMutation(
    `/api/newsletter-subscriptions`,
    subscribe
  );

  const onSubmitHandler: SubmitHandler<NewsletterFormData> = async (data) => {
    await trigger(data);
    setValue('email', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h4 className="prose mb-2 text-center">Subscribe to stay up-to-date!</h4>

      <div className="w-full flex">
        <div className="min-w-0 flex-[4]">
          <Input
            id="email"
            placeholder="E-mail"
            type="email"
            error={errors.email}
            isDisabled={isMutating}
            register={register('email')}
          />
        </div>

        <Button
          className="ml-2 flex-1 btn-secondary"
          type="submit"
          isLoading={isMutating}
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};
