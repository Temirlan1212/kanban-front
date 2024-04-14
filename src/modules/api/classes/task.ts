import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  ApiResponse,
  ApiResponseWithPagination,
} from '../models/data-access.model';
import { ITask, ITaskQueryParams } from '../models/task.model';

export class TaskApi {
  constructor(private http: HttpClient) {}

  async findAll({
    page,
    perPage,
    title,
    createdAt,
  }: Partial<ITaskQueryParams>) {
    const params = new URLSearchParams();
    perPage && params.append('perPage', String(perPage));
    page && params.append('page', String(page));
    title && params.append('title', String(title));
    createdAt && params.append('createdAt', String(createdAt));

    return await firstValueFrom(
      this.http.get<ApiResponseWithPagination<ITask[]>>(`task?${params}`)
    );
  }

  async findOne(id: ITask['id']) {
    return await firstValueFrom(
      this.http.get<ApiResponse<ITask>>(`task/${id}`)
    );
  }

  async create(data: Partial<ITask>) {
    return await firstValueFrom(
      this.http.post<ApiResponse<ITask>>(`task`, data)
    );
  }

  async update(id: ITask['id'], data: ITask) {
    const payload: Omit<ITask, 'id'> = {
      title: String(data.title),
      status: String(data.status),
      deadline: String(data.deadline),
      priority: String(data.priority),
      executors: String(data.executors),
    };
    return await firstValueFrom(
      this.http.put<ApiResponse<ITask>>(`task/${id}`, payload)
    );
  }

  async delete(id: ITask['id']) {
    return await firstValueFrom(
      this.http.delete<ApiResponse<ITask>>(`task/${id}`)
    );
  }

  //   async update(columns: ITask['columns'], id: ITask['boardId']) {
  //     return await firstValueFrom(
  //       this.http.patch<ApiResponse<ITask>>(`board-columns/boardId/${id}`, {
  //         columns,
  //       })
  //     );
  //   }
}
