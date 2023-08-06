import { ApiResponse } from '@/types';
import { NewsletterSubscription, PrismaClient } from '@prisma/client';

type CreateResponse = ApiResponse<NewsletterSubscription>;

type CreateSubscription = {
  email: string;
};

export const createSubscription = async (
  data: CreateSubscription
): Promise<NewsletterSubscription> => {
  const prisma = new PrismaClient();
  const insert = { email: data.email };

  const newsletterSubscription = await prisma.newsletterSubscription.upsert({
    create: insert,
    update: insert,
    where: insert,
  });

  return newsletterSubscription;
};
