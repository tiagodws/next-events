import { ApiResponse } from '@/types';
import { NewsletterSubscription } from '@prisma/client';
import { FC, FormEvent, useRef, useState } from 'react';
import { z } from 'zod';
import { Button, toast } from '../ui';

const subscribe = async (email: string) => {
  const res = await fetch('/api/newsletter-subscriptions', {
    method: 'POST',
    body: JSON.stringify({ email }),
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
  const emailRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;

    if (!email) {
      return;
    }

    const result = z.string().email().safeParse(email);

    if (!result.success) {
      toast({
        id: 'invalid-email',
        message: 'Please enter a valid email address.',
        statusType: 'warning',
      });
      return;
    }

    try {
      setIsLoading(true);

      await subscribe(email);

      emailRef.current.value = '';

      toast({
        id: 'subscribe-success',
        message: 'You have subscribed!',
        statusType: 'success',
      });
    } catch (err: any) {
      toast({
        id: 'subscribe-error',
        message: err.message,
        statusType: 'error',
      });
    }

    setIsLoading(false);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <h4 className="prose mb-2">Subscribe to stay up-to-date!</h4>
      <div className="join">
        <input
          id="email"
          className="input input-bordered join-item"
          placeholder="Email"
          ref={emailRef}
          disabled={isLoading}
        />

        <Button
          text="Subscribe"
          className="join-item"
          type="submit"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};
