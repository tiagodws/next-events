import { createComment } from '@/lib/create-comment';
import { getComments } from '@/lib/get-comments';
import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationRequest,
} from '@/types';
import type { Comment } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type GetResponseData = PaginatedApiResponse<Comment[]>;
type PostResponseData = ApiResponse<Comment>;

const querySchema = z.object({
  eventId: z.string().uuid(),
  pageNumber: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData>
) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    case 'POST':
      return postHandler(req, res);
    default:
      return res.status(405);
  }
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData>
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

  const { eventId, pageNumber, pageSize } = queryResult.data;
  const paginationRequest: PaginationRequest = {
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
  };
  const [comments, pagination] = await getComments(eventId, paginationRequest);

  res.status(200).json({ data: comments, metadata: { pagination } });
};

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  content: z.string(),
});

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData>
) => {
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

  const { eventId } = queryResult.data;
  const body = bodyResult.data;
  const comment = await createComment(eventId, body);

  res.status(201).json({ data: comment });
};

export default handler;
