import { Event, PrismaClient } from '@prisma/client';

export const getEventById = async (id: string): Promise<Event | null> => {
  const prisma = new PrismaClient();
  const data = await prisma.event.findUnique({
    where: { id },
  });

  return data;
};
