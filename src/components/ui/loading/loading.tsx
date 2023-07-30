import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};
