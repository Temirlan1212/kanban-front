import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IBoard } from '../models/boards.model';
import {
  ApiResponseWithPagination,
  ApiResponse,
} from '../models/data-access.model';

export class BoardsApi {
  constructor(private http: HttpClient) {}

  async findAll() {
    return await firstValueFrom(
      this.http.get<ApiResponseWithPagination<IBoard[]>>(`boards`)
    );
  }

  async findOne(id: IBoard['id']) {
    return await firstValueFrom(
      this.http.get<ApiResponse<IBoard>>(`boards/${id}`)
    );
  }

  async create(data: IBoard) {
    return await firstValueFrom(
      this.http.post<ApiResponseWithPagination<IBoard>>(`boards`, {
        title: data.title,
      })
    );
  }

  async update(data: IBoard, id: IBoard['id']) {
    return await firstValueFrom(
      this.http.patch<ApiResponseWithPagination<IBoard>>(`boards/${id}`, {
        title: data.title,
      })
    );
  }

  async delete(id: IBoard['id']) {
    return await firstValueFrom(
      this.http.delete<ApiResponse<IBoard['id']>>(`boards/${id}`)
    );
  }
}
