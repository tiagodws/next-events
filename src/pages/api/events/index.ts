import { getEvents } from '@/lib/get-events';
import { PaginatedApiResponse, PaginationRequest } from '@/types';
import { Event } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = PaginatedApiResponse<Event[]>;

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
  const query = req.query;
  const { pageNumber, pageSize } = query;
  const paginationRequest: PaginationRequest = {
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
  };
  const [events, pagination] = await getEvents(paginationRequest);

  res.status(200).json({ data: events, metadata: { pagination } });
};

export default handler;
