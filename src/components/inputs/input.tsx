import type { FC } from 'react';
import type { InputBaseProps } from './input-base-props';
import { InputWrapper } from './input-wrapper';

type InputProps = InputBaseProps & {
  type?: 'text' | 'tel' | 'email' | 'password' | 'url';
};

export const Input: FC<InputProps> = (props) => {
  const { id, label, placeholder, type, error, isDisabled, register } = props;

  return (
    <InputWrapper id={id} label={label} error={error}>
      <input
        id={id}
        className={`input input-bordered w-full ${
          error?.message ? 'input-error' : ''
        }`}
        placeholder={placeholder}
        type={type}
        disabled={isDisabled}
        {...register}
      />
    </InputWrapper>
  );
};
