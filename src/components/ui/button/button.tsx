import type { StatusType } from '@/types';
import type { FC, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  statusType?: StatusType;
  className?: string;
  onClick?: () => void;
};

const statusTypeClasses = {
  default: '',
  info: 'btn-info',
  warning: 'btn-warning',
  error: 'btn-error',
  success: 'btn-success',
};

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    type = 'button',
    isLoading,
    isDisabled,
    statusType = 'default',
    className,
    onClick,
  } = props;

  return (
    <button
      className={`btn normal-case ${statusTypeClasses[statusType]} ${className}`}
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};
