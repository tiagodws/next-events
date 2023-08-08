import { authOptions } from '@/lib/auth-options';
import { getEventById, getEventBySlug } from '@/lib/get-event';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';
import type { Event } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
  eventId: z.string().uuid(),
});

type Params = z.infer<typeof paramsSchema>;

export const GET = async (
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse<ApiResponse<Event>>> => {
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

  const id = paramsValidation.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    return NextResponse.json(
      { error: { message: 'Not found' } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: event }, { status: 200 });
};

const bodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().url(),
  date: z.coerce.date(),
  isFeatured: z.boolean(),
});

export const PUT = async (
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse<ApiResponse<Event>>> => {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  const paramsValidation = paramsSchema.safeParse(params);
  const bodyValidation = bodySchema.safeParse(req.body);

  if (!paramsValidation.success) {
    return NextResponse.json(
      {
        error: { message: 'Invalid parameters' },
        errors: paramsValidation.error.errors,
      },
      { status: 400 }
    );
  }

  if (!bodyValidation.success) {
    return NextResponse.json(
      {
        error: { message: 'Invalid data' },
        errors: bodyValidation.error.errors,
      },
      { status: 400 }
    );
  }

  const id = paramsValidation.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    return NextResponse.json(
      { error: { message: 'Not found' } },
      { status: 404 }
    );
  }

  const existingEvent = await getEventBySlug(bodyValidation.data.slug);

  if (existingEvent && existingEvent.id !== id) {
    return NextResponse.json(
      { error: { message: 'Slug already in use' } },
      { status: 409 }
    );
  }

  const updatedEvent = await prisma.event.update({
    data: bodyValidation.data,
    where: { id },
  });

  return NextResponse.json({ data: updatedEvent }, { status: 200 });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse<ApiResponse<Event>>> => {
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

  const id = paramsValidation.data.eventId;
  const event = await getEventById(id);

  if (!event) {
    return NextResponse.json(
      { error: { message: 'Not found' } },
      { status: 404 }
    );
  }

  await prisma.event.delete({
    where: { id },
  });

  return NextResponse.json({}, { status: 200 });
};
