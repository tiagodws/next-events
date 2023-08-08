import type { FC } from 'react';
import type { InputBaseProps } from './input-base-props';
import { InputWrapper } from './input-wrapper';

type TextAreaProps = InputBaseProps & {
  rows?: number;
};

export const TextArea: FC<TextAreaProps> = (props) => {
  const { id, label, placeholder, rows, error, isDisabled, register } = props;

  return (
    <InputWrapper id={id} label={label} error={error}>
      <textarea
        id={id}
        className={`textarea textarea-bordered w-full ${
          error?.message ? 'textarea-error' : ''
        }`}
        placeholder={placeholder}
        rows={rows}
        disabled={isDisabled}
        {...register}
      />
    </InputWrapper>
  );
};
