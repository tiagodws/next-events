import Error from 'next/error';

const NotFoundPage = () => {
  return <Error statusCode={404} withDarkMode={false} />;
};

export default NotFoundPage;
