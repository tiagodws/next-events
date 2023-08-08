import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type InputBaseProps = {
  id: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  isDisabled?: boolean;
  register: UseFormRegisterReturn;
};
