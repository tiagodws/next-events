import { getEventById, getEventBySlug } from '@/lib/get-event';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';

type ResponseData = ApiResponse<Event>;

const querySchema = z.object({ eventId: z.string().uuid() });

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'PUT':
      return putHandler(req, res);
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      return res.status(405);
  }
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const queryResult = querySchema.safeParse(req.query);

  if (!queryResult.success) {
    res.status(400).json({
      error: {
        message: 'Invalid parameters',
        errors: queryResult.error.errors,
      },
    });
    return;
  }

  const id = queryResult.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    res.status(404).json({
      error: { message: 'Not found' },
    });
    return;
  }

  res.status(200).json({ data: event });
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

const putHandler = async (
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

  const queryResult = querySchema.safeParse(req.query);
  const bodyResult = bodySchema.safeParse(req.body);

  if (!queryResult.success) {
    res.status(400).json({
      error: {
        message: 'Invalid parameters',
        errors: queryResult.error.errors,
      },
    });
    return;
  }

  if (!bodyResult.success) {
    res.status(400).json({
      error: { message: 'Invalid data', errors: bodyResult.error.errors },
    });
    return;
  }

  const id = queryResult.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    res.status(404).json({
      error: { message: 'Not found' },
    });
    return;
  }

  const existingEvent = await getEventBySlug(bodyResult.data.slug);

  if (existingEvent && existingEvent.id !== id) {
    res.status(409).json({
      error: { message: 'Slug already in use' },
    });
    return;
  }

  const updatedEvent = await prisma.event.update({
    data: bodyResult.data,
    where: { id },
  });

  res.status(200).json({ data: updatedEvent });
};

const deleteHandler = async (
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

  const queryResult = querySchema.safeParse(req.query);

  if (!queryResult.success) {
    res.status(400).json({
      error: {
        message: 'Invalid parameters',
        errors: queryResult.error.errors,
      },
    });
    return;
  }

  const id = queryResult.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    res.status(404).json({
      error: { message: 'Not found' },
    });
    return;
  }

  await prisma.event.delete({
    where: { id },
  });

  res.status(200).json({});
};

export default handler;
