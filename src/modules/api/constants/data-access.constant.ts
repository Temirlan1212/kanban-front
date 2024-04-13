import { PaginationMeta } from '../models/data-access.model';

export const paginationMetaInitState: PaginationMeta = {
  total: 0,
  lastPage: 0,
  currentPage: 0,
  perPage: 0,
  prev: null,
  next: null,
};
