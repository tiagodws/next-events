import { Layout } from '@/components/layout';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>

      <Analytics />
    </>
  );
};

export default App;
