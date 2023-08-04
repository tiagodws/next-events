import { PaginatedApiResponse, Pagination, PaginationRequest } from '@/types';
import { Event, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = PaginatedApiResponse<Event[]>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'GET') {
    res.status(405);
    return;
  }

  const query = req.query;
  const { page, limit } = query;
  const paginationRequest: PaginationRequest = {
    pageNumber: Math.max(Number(page), 1) || 1,
    pageSize: Math.min(Number(limit) || 10, 10),
  };

  const prisma = new PrismaClient();
  const take = paginationRequest.pageSize;
  const skip = paginationRequest.pageNumber - 1 * paginationRequest.pageSize;

  const [count, data] = await prisma.$transaction([
    prisma.event.count(),
    prisma.event.findMany({
      skip,
      take,
    }),
  ]);

  const pagination: Pagination = {
    pageNumber: paginationRequest.pageNumber,
    pageCount: Math.ceil(count / paginationRequest.pageSize),
    pageSize: paginationRequest.pageSize,
    totalCount: count,
  };

  const responseData: ResponseData = {
    data,
    metadata: { pagination },
  };

  res.status(200).json(responseData);
};

export default handler;
