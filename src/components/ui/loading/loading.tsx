import type { FC } from 'react';

type LoadingProps = {
  className?: string;
};

export const Loading: FC<LoadingProps> = (props) => {
  const { className } = props;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};
