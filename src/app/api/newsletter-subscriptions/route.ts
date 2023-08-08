import { createSubscription } from '@/lib/create-subscription';
import type { ApiResponse } from '@/types';
import type { NewsletterSubscription } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
});

export const POST = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<NewsletterSubscription>>> => {
  const body = await req.json();
  const bodyValidation = bodySchema.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      {
        error: { message: 'Invalid data' },
        errors: bodyValidation.error.errors,
      },
      { status: 400 }
    );
  }

  const newsletterSubscription = await createSubscription(bodyValidation.data);

  return NextResponse.json({ data: newsletterSubscription }, { status: 201 });
};
