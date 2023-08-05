import { StatusType } from '@/types';
import { FC } from 'react';

type ButtonProps = {
  text?: string;
  type: 'button' | 'submit' | 'reset';
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
    text,
    type,
    isLoading,
    isDisabled,
    statusType = 'default',
    className,
    onClick,
  } = props;

  return (
    <button
      className={`btn ${statusTypeClasses[statusType]} ${className}`}
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className="loading loading-spinner" />}
      {text}
    </button>
  );
};
