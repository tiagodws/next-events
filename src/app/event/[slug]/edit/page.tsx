import { authOptions } from '@/lib/auth-options';
import { getEventBySlug } from '@/lib/get-event';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import type { FC } from 'react';
import { z } from 'zod';
import ClientEditEventPage, {
  type ClientEditEventPageProps,
} from './client-page';

type EditEventPageProps = {
  params: {
    slug?: string[];
  };
};

const EditEventPage: FC<EditEventPageProps> = async (props) => {
  const clientPageProps = await getStaticProps(props);
  return <ClientEditEventPage {...clientPageProps} />;
};

const getStaticProps = async (
  props: EditEventPageProps
): Promise<ClientEditEventPageProps> => {
  const { slug } = props.params;
  const session = await getServerSession(authOptions);
  const validation = z.string().safeParse(slug);

  if (!validation.success) {
    return notFound();
  }

  const event = await getEventBySlug(validation.data);

  if (!event) {
    return notFound();
  }

  if (!session) {
    return redirect(`/event/${validation.data}`);
  }

  return { event };
};

export const metadata: Metadata = {
  title: 'Next Events - Edit event',
};

export default EditEventPage;
