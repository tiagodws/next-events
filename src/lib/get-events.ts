import type { Pagination, PaginationRequest } from '@/types';
import type { Event } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type GetEvents = [data: Event[], pagination: Pagination];

export const getEvents = async (
  paginationRequest: Partial<PaginationRequest> = {}
): Promise<GetEvents> => {
  const sanitizedPaginationRequest: PaginationRequest = {
    pageNumber: Math.max(paginationRequest.pageNumber || 1, 1),
    pageSize: Math.max(Math.min(paginationRequest.pageSize || 10, 10), 1),
  };

  const prisma = new PrismaClient();
  const take = paginationRequest.pageSize;
  const skip =
    (sanitizedPaginationRequest.pageNumber - 1) *
    sanitizedPaginationRequest.pageSize;

  const [count, data] = await prisma.$transaction([
    prisma.event.count(),
    prisma.event.findMany({
      skip,
      take,
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
