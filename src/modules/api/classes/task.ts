import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  ApiResponse,
  ApiResponseWithPagination,
} from '../models/data-access.model';
import { ITask } from '../models/task.model';

export class TaskApi {
  constructor(private http: HttpClient) {}

  async findAll() {
    return await firstValueFrom(
      this.http.get<ApiResponseWithPagination<ITask[]>>(`task`)
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
