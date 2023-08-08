import type { FC } from 'react';
import type { InputBaseProps } from './input-base-props';
import { InputWrapper } from './input-wrapper';

type SelectProps = InputBaseProps & {
  options: { label?: string; value: string | number; isDisabled?: boolean }[];
};

export const Select: FC<SelectProps> = (props) => {
  const { id, label, placeholder, options, error, isDisabled, register } =
    props;

  return (
    <InputWrapper id={id} label={label} error={error}>
      <select
        id={id}
        className="select select-bordered flex-1 min-w-0"
        placeholder={placeholder}
        disabled={isDisabled}
        {...register}
      >
        {options.map(({ label, value, isDisabled }) => (
          <option key={value} value={value} disabled={isDisabled}>
            {label ?? value}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
};
