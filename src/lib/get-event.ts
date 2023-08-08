import type { Event } from '@prisma/client';
import 'server-only';
import { prisma } from './prisma';

export const getEventById = async (id: string): Promise<Event | null> => {
  const data = await prisma.event.findUnique({
    where: { id },
  });

  return data;
};

export const getEventBySlug = async (slug: string): Promise<Event | null> => {
  const data = await prisma.event.findUnique({
    where: { slug },
  });

  return data;
};
