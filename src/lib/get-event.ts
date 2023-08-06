import type { Event } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getEventById = async (id: string): Promise<Event | null> => {
  const prisma = new PrismaClient();
  const data = await prisma.event.findUnique({
    where: { id },
  });

  return data;
};

export const getEventBySlug = async (slug: string): Promise<Event | null> => {
  const prisma = new PrismaClient();
  const data = await prisma.event.findUnique({
    where: { slug },
  });

  return data;
};
