import { createSubscription } from '@/lib/create-subscription';
import type { ApiResponse } from '@/types';
import type { NewsletterSubscription } from '@prisma/client';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
});

export const POST = async (
  req: NextApiRequest
): Promise<NextResponse<ApiResponse<NewsletterSubscription>>> => {
  const bodyValidation = bodySchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      {
        error: { message: 'Invalid data' },
        errors: bodyValidation.error.errors,
      },
      { status: 400 }
    );
  }

  const body = bodyValidation.data;
  const newsletterSubscription = await createSubscription(body);

  return NextResponse.json({ data: newsletterSubscription }, { status: 201 });
};
