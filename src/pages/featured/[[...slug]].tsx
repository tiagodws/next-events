import { EventList } from '@/components/events';
import { NewsletterForm } from '@/components/newsletter-form';
import { getFeaturedEvents } from '@/lib/get-featured-events';
import { Pagination } from '@/types';
import type { Event } from '@prisma/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { Alert, Loading } from '../../components/ui';

type FeaturedPageProps = {
  events?: Event[];
  pagination?: Pagination;
};

const FeaturedPage: FC<FeaturedPageProps> = (props) => {
  const { events, pagination } = props;
  const router = useRouter();
  const { isFallback } = router;

  const buildPageUrl = (pageNumber: number) => {
    return `/featured/${pageNumber}`;
  };

  return (
    <div className="container max-w-lg mx-auto px-4">
      <div className="mb-8">
        <NewsletterForm />
      </div>

      {isFallback && <Loading />}

      {!isFallback && !events?.length && (
        <Alert statusType="default" message="No events found." />
      )}

      {!isFallback && !!events?.length && !!pagination && (
        <EventList
          items={events}
          pagination={pagination}
          buildPageUrl={buildPageUrl}
        />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<FeaturedPageProps> = async (
  context
) => {
  const slug = context.params?.slug;
  const page = slug?.[0];
  const pageNumber = Number(page) || 1;

  const [events, pagination] = await getFeaturedEvents({ pageNumber });

  return {
    props: { events, pagination },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [_, pagination] = await getFeaturedEvents();
  const { pageCount } = pagination;
  const pagePaths = Array.from({ length: pageCount }, (_, i) => ({
    params: { slug: [String(i + 1)] },
  }));

  const paths = [{ params: { slug: [''] } }, ...pagePaths];

  return {
    paths,
    fallback: true,
  };
};

export default FeaturedPage;
