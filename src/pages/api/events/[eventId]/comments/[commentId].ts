import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Comment } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';

type DeleteResponseData = ApiResponse<Comment>;

const querySchema = z.object({
  commentId: z.string().uuid(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponseData>
) => {
  switch (req.method) {
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      return res.status(405);
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponseData>
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

  const { commentId } = queryResult.data;
  await prisma.comment.delete({ where: { id: commentId } });

  res.status(201).json({});
};

export default handler;
