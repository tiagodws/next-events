import { ZodIssue } from 'zod';

export type Metadata = {};

type ApiError = {
  message: string;
  errors?: ZodIssue[];
};

export type ApiResponse<T> = {
  data?: T;
  metadata?: Metadata;
  error?: ApiError;
};
