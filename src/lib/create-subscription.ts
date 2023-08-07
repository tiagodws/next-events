import type { NewsletterSubscription } from '@prisma/client';
import { prisma } from './prisma';

type CreateSubscription = {
  email: string;
};

export const createSubscription = async (
  data: CreateSubscription
): Promise<NewsletterSubscription> => {
  const insert = { email: data.email };

  const newsletterSubscription = await prisma.newsletterSubscription.upsert({
    create: insert,
    update: insert,
    where: insert,
  });

  return newsletterSubscription;
};
