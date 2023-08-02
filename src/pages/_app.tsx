import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find interesting events for your personal development!"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
