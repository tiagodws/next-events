import { ApiResponse } from '@/types';
import { Event, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type ResponseData = ApiResponse<Event>;

const querySchema = z.array(z.string().uuid()).length(1);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'GET') {
    res.status(405);
    return;
  }

  const queryResult = querySchema.safeParse(req.query);

  if (!queryResult.success) {
    res.status(404).json({
      error: { message: 'Not found', errors: queryResult.error.errors },
    });
    return;
  }

  const eventId = queryResult.data[0];
  const prisma = new PrismaClient();
  const data = await prisma.event.findUnique({
    where: { id: eventId as string },
  });

  if (!data) {
    res.status(404);
    return;
  }

  const responseData: ResponseData = {
    data,
    metadata: {},
  };

  res.status(200).json(responseData);
};

export default handler;
