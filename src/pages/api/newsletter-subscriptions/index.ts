import { ApiResponse } from '@/types';
import { NewsletterSubscription, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type ResponseData = ApiResponse<NewsletterSubscription>;

const bodySchema = z.object({
  email: z.string().email(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } });
    return;
  }

  const bodyResult = bodySchema.safeParse(req.body);

  if (!bodyResult.success) {
    res.status(400).json({
      error: {
        message: fromZodError(bodyResult.error).message,
        errors: bodyResult.error.errors,
      },
    });
    return;
  }

  const body = bodyResult.data;
  const prisma = new PrismaClient();

  const data = await prisma.newsletterSubscription.upsert({
    create: { email: body.email },
    update: { email: body.email },
    where: { email: body.email },
  });

  res.status(201).json({ data });
};

export default handler;
