import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Comment } from '@prisma/client';
import type { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
  commentId: z.string().uuid(),
});

type Params = z.infer<typeof paramsSchema>;

export const DELETE = async (
  req: NextApiRequest,
  { params }: { params: Params }
): Promise<NextResponse<ApiResponse<Comment>>> => {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

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

  const { commentId } = paramsValidation.data;
  await prisma.comment.delete({ where: { id: commentId } });

  return NextResponse.json({}, { status: 200 });
};
