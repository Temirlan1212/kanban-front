export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface PaginationResponse<T> {
  data: T;
  meta: PaginationMeta;
}

export type ApiResponse<T> = {
  ok: boolean;
  statusCode: string;
  path?: string;
  message: string | { property: string; message: string }[];
  result: T;
};

export type ApiResponseWithPagination<T> = {
  ok: boolean;
  statusCode: string;
  path?: string;
  message: string | { property: string; message: string }[];
  result: PaginationResponse<T>;
};

export interface PaginationQuery<T extends number> {
  perPage: T;
  page: T;
}

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface PaginationQuery<T extends number> {
  perPage: T;
  page: T;
}
