import { getEventBySlug } from '@/lib/get-event';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';

type ResponseData = ApiResponse<Event>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'POST':
      return postHandler(req, res);
    default:
      return res.status(405);
  }
};

const bodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().url(),
  date: z.coerce.date(),
  isFeatured: z.boolean(),
});

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const session = getSession({ req });

  if (!session) {
    res.status(401).json({
      error: { message: 'Unauthorized' },
    });
    return;
  }

  const bodyResult = bodySchema.safeParse(req.body);

  if (!bodyResult.success) {
    res.status(400).json({
      error: { message: 'Invalid data', errors: bodyResult.error.errors },
    });
    return;
  }

  const existingEvent = await getEventBySlug(bodyResult.data.slug);

  if (existingEvent) {
    res.status(409).json({
      error: { message: 'Slug already in use' },
    });
    return;
  }

  const event = await prisma.event.create({
    data: bodyResult.data,
  });

  res.status(200).json({ data: event });
};

export default handler;
