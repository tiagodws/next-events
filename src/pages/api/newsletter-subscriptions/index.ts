import { createSubscription } from '@/lib/create-subscription';
import type { ApiResponse } from '@/types';
import type { NewsletterSubscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type PostResponseData = ApiResponse<NewsletterSubscription>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData>
) => {
  switch (req.method) {
    case 'POST':
      return postHandler(req, res);
    default:
      return res.status(405);
  }
};

const bodySchema = z.object({
  email: z.string().email(),
});

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData>
) => {
  const bodyResult = bodySchema.safeParse(req.body);

  if (!bodyResult.success) {
    res.status(400).json({
      error: { message: 'Invalid data', errors: bodyResult.error.errors },
    });
    return;
  }

  const body = bodyResult.data;
  const newsletterSubscription = await createSubscription(body);

  res.status(201).json({ data: newsletterSubscription });
};

export default handler;
