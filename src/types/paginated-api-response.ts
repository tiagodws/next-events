import { Metadata } from 'next';
import { ApiResponse } from './api-response';

export type Pagination = {
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
};

type PaginatedMetadata = Metadata & {
  pagination: Pagination;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  metadata?: PaginatedMetadata;
};
