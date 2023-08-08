import { createComment } from '@/lib/create-comment';
import { getComments } from '@/lib/get-comments';
import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationRequest,
} from '@/types';
import type { Comment } from '@prisma/client';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
  eventId: z.string().uuid(),
  pageNumber: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
});

type Params = z.infer<typeof paramsSchema>;

export const GET = async (
  req: NextApiRequest,
  { params }: { params: Params }
): Promise<NextResponse<PaginatedApiResponse<Comment[]>>> => {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    return NextResponse.json(
      {
        error: {
          message: 'Invalid parameters',
          errors: paramsValidation.error.errors,
        },
      },
      { status: 400 }
    );
  }

  const { eventId, pageNumber, pageSize } = paramsValidation.data;
  const paginationRequest: PaginationRequest = {
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
  };
  const [comments, pagination] = await getComments(eventId, paginationRequest);

  return NextResponse.json(
    { data: comments, metadata: { pagination } },
    { status: 200 }
  );
};

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  content: z.string(),
});

export const POST = async (
  req: NextApiRequest,
  { params }: { params: Params }
): Promise<NextResponse<ApiResponse<Comment>>> => {
  const paramsValidation = paramsSchema.safeParse(params);
  const bodyValidation = bodySchema.safeParse(req.body);

  if (!paramsValidation.success) {
    return NextResponse.json(
      {
        error: {
          message: 'Invalid parameters',
          errors: paramsValidation.error.errors,
        },
      },
      { status: 400 }
    );
  }

  if (!bodyValidation.success) {
    return NextResponse.json(
      {
        error: {
          message: 'Invalid data',
          errors: bodyValidation.error.errors,
        },
      },
      { status: 400 }
    );
  }

  const { eventId } = paramsValidation.data;
  const body = bodyValidation.data;
  const comment = await createComment(eventId, body);

  return NextResponse.json({ data: comment }, { status: 201 });
};
