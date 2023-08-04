import { ApiResponse } from '@/types';
import { NewsletterSubscription, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type ResponseData = ApiResponse<NewsletterSubscription>;

const bodySchema = z.object({
  email: z.string().email(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  if (!bodySchema.parse(req.body)) {
    res.status(400);
    return;
  }

  const body = bodySchema.parse(req.body);
  const prisma = new PrismaClient();

  const data = await prisma.newsletterSubscription.create({
    data: { email: body.email },
  });

  res.status(201).json({ data });
};

export default handler;
