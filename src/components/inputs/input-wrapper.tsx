import type { FC, ReactNode } from 'react';
import type { InputBaseProps } from './input-base-props';

type InputWrapperProps = Pick<InputBaseProps, 'id' | 'label' | 'error'> & {
  children: ReactNode;
};

export const InputWrapper: FC<InputWrapperProps> = (props) => {
  const { id, label, error, children } = props;

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label" htmlFor={id}>
          <span className="label-text">{label}</span>
        </label>
      )}

      {children}

      <label className="label">
        {error?.message && (
          <span className="label-text-alt text-error">{error?.message}</span>
        )}
      </label>
    </div>
  );
};
