import type { StatusType } from '@/types';
import type { FC, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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

const btnSizeClasses = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const loadingSizeClasses = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
  xl: 'loading-xl',
};

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    type = 'button',
    size = 'md',
    isLoading,
    isDisabled,
    statusType = 'default',
    className,
    onClick,
  } = props;
  return (
    <button
      className={`btn flex-nowrap ${statusTypeClasses[statusType]} ${btnSizeClasses[size]} ${className}`}
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <span
          className={`loading loading-spinner ${loadingSizeClasses[size]}`}
        />
      )}

      {!isLoading && children}
    </button>
  );
};
