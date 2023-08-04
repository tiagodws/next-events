import { PrismaClient } from '@prisma/client';
import { events } from './events';

const prisma = new PrismaClient();

export async function main(): Promise<void> {
  const promises = events.map((event) => {
    const data = { ...event, theme: undefined };
    return prisma.event.upsert({
      create: data,
      update: data,
      where: { id: event.id },
    });
  });

  await Promise.all(promises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
