import {
  ApiResponse,
  PaginatedApiResponse,
  Pagination,
  PaginationRequest,
} from '@/types';
import { Comment, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type GetResponseData = PaginatedApiResponse<Comment[]>;
type PostResponseData = ApiResponse<Comment>;

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
      res.status(405);
  }
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData>
) => {
  const query = req.query;
  const { eventId, page, limit } = query;
  const paginationRequest: PaginationRequest = {
    pageNumber: Math.max(Number(page), 1) || 1,
    pageSize: Math.min(Number(limit) || 10, 10),
  };

  const prisma = new PrismaClient();
  const where = { eventId: eventId as string };
  const take = paginationRequest.pageSize;
  const skip = paginationRequest.pageNumber - 1 * paginationRequest.pageSize;

  const [count, data] = await prisma.$transaction([
    prisma.comment.count({ where }),
    prisma.comment.findMany({
      skip,
      take,
      where,
    }),
  ]);

  const pagination: Pagination = {
    pageNumber: paginationRequest.pageNumber,
    pageCount: Math.ceil(count / paginationRequest.pageSize),
    pageSize: paginationRequest.pageSize,
    totalCount: count,
  };

  const responseData: GetResponseData = {
    data,
    metadata: { pagination },
  };

  res.status(200).json(responseData);
};

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  content: z.string(),
});

const querySchema = z.array(z.string().uuid()).length(1);

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData>
) => {
  const queryResult = querySchema.safeParse(req.query);
  const bodyResult = bodySchema.safeParse(req.body);

  if (!queryResult.success) {
    res
      .status(404)
      .json({
        error: { message: 'Not found', errors: queryResult.error.errors },
      });
    return;
  }

  if (!bodyResult.success) {
    res
      .status(400)
      .json({
        error: { message: 'Invalid request', errors: bodyResult.error.errors },
      });
    return;
  }

  const eventId = queryResult.data[0];
  const body = bodyResult.data;
  const prisma = new PrismaClient();

  const data = await prisma.comment.create({
    data: {
      eventId,
      email: body.email,
      name: body.name,
      content: body.content,
    },
  });

  res.status(201).json({ data });
};

export default handler;
