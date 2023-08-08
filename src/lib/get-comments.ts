import type { Pagination, PaginationRequest } from '@/types';
import type { Comment } from '@prisma/client';
import 'server-only';
import { prisma } from './prisma';

type GetComments = [data: Comment[], pagination: Pagination];

export const getComments = async (
  eventId: string,
  paginationRequest: Partial<PaginationRequest> = {}
): Promise<GetComments> => {
  const sanitizedPaginationRequest: PaginationRequest = {
    pageNumber: Math.max(paginationRequest.pageNumber || 1, 1),
    pageSize: Math.max(Math.min(paginationRequest.pageSize || 10, 10), 1),
  };
  const where = { eventId };
  const take = sanitizedPaginationRequest.pageSize;
  const skip =
    (sanitizedPaginationRequest.pageNumber - 1) *
    sanitizedPaginationRequest.pageSize;

  const [count, data] = await prisma.$transaction([
    prisma.comment.count({ where }),
    prisma.comment.findMany({
      skip,
      take,
      where,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const pagination: Pagination = {
    pageNumber: sanitizedPaginationRequest.pageNumber,
    pageCount: Math.ceil(count / sanitizedPaginationRequest.pageSize),
    pageSize: sanitizedPaginationRequest.pageSize,
    totalCount: count,
  };

  return [data, pagination];
};
