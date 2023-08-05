import { Event, PrismaClient } from '@prisma/client';
import { Pagination, PaginationRequest } from '../types';

type GetFeaturedEvents = [data: Event[], pagination: Pagination];

export const getFeaturedEvents = async (
  paginationRequest: Partial<PaginationRequest> = {}
): Promise<GetFeaturedEvents> => {
  const sanitizedPaginationRequest: PaginationRequest = {
    pageNumber: Math.max(paginationRequest.pageNumber || 1, 1),
    pageSize: Math.max(Math.min(paginationRequest.pageSize || 10, 10), 1),
  };

  const prisma = new PrismaClient();
  const take = paginationRequest.pageSize;
  const skip =
    (sanitizedPaginationRequest.pageNumber - 1) *
    sanitizedPaginationRequest.pageSize;
  const where = { isFeatured: true };

  const [count, data] = await prisma.$transaction([
    prisma.event.count({ where }),
    prisma.event.findMany({
      skip,
      take,
      where,
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