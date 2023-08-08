import type { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="prose">Page not found</p>
    </div>
  );
};

export default NotFoundPage;
