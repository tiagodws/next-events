import { authOptions } from '@/lib/auth-options';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { FC } from 'react';
import ClientCreateEventPage from './client-page';

const CreateEventPage: FC = async () => {
  await getStaticProps();
  return <ClientCreateEventPage />;
};

const getStaticProps = async (): Promise<void> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect(`/`);
  }

  return;
};

export const metadata: Metadata = {
  title: 'Next Events - Create event',
};

export default CreateEventPage;
