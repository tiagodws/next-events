import { getFeaturedEvents } from '@/lib/get-featured-events';
import type { Metadata } from 'next';
import type { FC } from 'react';
import ClientFeaturedPage, {
  type ClientFeaturedPageProps,
} from './client-page';

type FeaturedPageProps = {
  params: {
    slug?: string[];
  };
};

const FeaturedPage: FC<FeaturedPageProps> = async (props) => {
  const clientPageProps = await getStaticProps(props);
  return <ClientFeaturedPage {...clientPageProps} />;
};

const getStaticProps = async (
  props: FeaturedPageProps
): Promise<ClientFeaturedPageProps> => {
  const slug = props.params.slug;
  const page = slug?.[0];
  const pageNumber = Number(page) || 1;

  const [events, pagination] = await getFeaturedEvents({ pageNumber });

  return { events, pagination };
};

export const generateStaticParams = async (): Promise<FeaturedPageProps[]> => {
  const [, pagination] = await getFeaturedEvents();
  const { pageCount } = pagination;
  const pageParams = Array.from({ length: pageCount }, (_, i) => ({
    params: { slug: [String(i + 1)] },
  }));

  return [{ params: { slug: [''] } }, ...pageParams];
};

export const dynamicParams = true;
export const revalidate = 10;
export const metadata: Metadata = {
  title: 'Next Events - Featured events',
};

export default FeaturedPage;
