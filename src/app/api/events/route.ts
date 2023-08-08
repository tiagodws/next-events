import { authOptions } from '@/lib/auth-options';
import { getEventBySlug } from '@/lib/get-event';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().url(),
  date: z.coerce.date(),
  isFeatured: z.boolean(),
});

export const POST = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<Event>>> => {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  const body = await req.json();
  const bodyValidation = bodySchema.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      {
        error: { message: 'Invalid data' },
        errors: bodyValidation.error.errors,
      },
      { status: 400 }
    );
  }

  const existingEvent = await getEventBySlug(bodyValidation.data.slug);

  if (existingEvent) {
    return NextResponse.json(
      { error: { message: 'Slug already in use' } },
      { status: 409 }
    );
  }

  const event = await prisma.event.create({
    data: bodyValidation.data,
  });

  return NextResponse.json({ data: event }, { status: 201 });
};
