import type { Event } from '@prisma/client';
import { cache } from 'react';
import 'server-only';
import { prisma } from './prisma';

export const getEventById = cache(async (id: string): Promise<Event | null> => {
  const data = await prisma.event.findUnique({
    where: { id },
  });

  return data;
});

export const getEventBySlug = cache(
  async (slug: string): Promise<Event | null> => {
    const data = await prisma.event.findUnique({
      where: { slug },
    });

    return data;
  }
);
