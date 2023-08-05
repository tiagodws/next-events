import { getEventById } from '@/lib/get-event-by-id';
import { ApiResponse } from '@/types';
import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type ResponseData = ApiResponse<Event>;

const querySchema = z.array(z.string().uuid()).length(1);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
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
      error: { message: 'Invalid event ID', errors: queryResult.error.errors },
    });
    return;
  }

  const id = queryResult.data[0];
  const event = await getEventById(id);

  if (!event) {
    res.status(404).json({
      error: { message: 'Not found' },
    });
    return;
  }

  res.status(200).json({ data: event });
};

export default handler;
