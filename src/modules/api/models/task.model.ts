import { PaginationQuery } from './data-access.model';

export interface ITask {
  title: string;
  status: string;
  deadline: string;
  priority: string;
  executors: string;
  id: string;
}

export type ServerTimestampt = { createdAt: string; updatedAt: string };

export interface ITaskQueryParams extends PaginationQuery<number> {
  title: string;
  createdAt: 'asc' | 'desc';
}
