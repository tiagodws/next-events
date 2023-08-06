import { Event, PrismaClient } from '@prisma/client';
import { lastDayOfMonth, set } from 'date-fns';
import { Pagination, PaginationRequest } from '../types';

type GetMonthEvents = [data: Event[], pagination: Pagination];

export const getMonthEvents = async (
  dateParams: { monthNumber: number; yearNumber: number },
  paginationRequest: Partial<PaginationRequest> = {}
): Promise<GetMonthEvents> => {
  const { monthNumber, yearNumber } = dateParams;
  const sanitizedPaginationRequest: PaginationRequest = {
    pageNumber: Math.max(paginationRequest.pageNumber || 1, 1),
    pageSize: Math.max(Math.min(paginationRequest.pageSize || 10, 10), 1),
  };

  const prisma = new PrismaClient();
  const take = paginationRequest.pageSize;
  const skip =
    (sanitizedPaginationRequest.pageNumber - 1) *
    sanitizedPaginationRequest.pageSize;

  const date = new Date(yearNumber, monthNumber - 1);
  const dateMin = set(date, {
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const dateMax = set(date, {
    date: lastDayOfMonth(date).getDate(),
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
  });

  const where = { date: { gte: dateMin, lte: dateMax } };

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