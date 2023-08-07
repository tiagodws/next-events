import type { Comment } from '@prisma/client';
import { prisma } from './prisma';

type CreateComment = {
  email: string;
  name: string;
  content: string;
};

export const createComment = async (
  eventId: string,
  data: CreateComment
): Promise<Comment> => {
  const comment = await prisma.comment.create({
    data: {
      eventId,
      email: data.email,
      name: data.name,
      content: data.content,
    },
  });

  return comment;
};
