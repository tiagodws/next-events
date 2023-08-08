import type { ZodIssue } from 'zod';

type ApiError = {
  message: string;
  errors?: ZodIssue[];
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};
