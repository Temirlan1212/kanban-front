import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IBoardColumns } from '../models/boards.model';
import {
  ApiResponse,
  ApiResponseWithPagination,
} from '../models/data-access.model';

export class BoardColumnsApi {
  constructor(private http: HttpClient) {}

  async findAll() {
    return await firstValueFrom(
      this.http.get<ApiResponseWithPagination<IBoardColumns[]>>(`board-columns`)
    );
  }

  async findOne(id: IBoardColumns['id']) {
    return await firstValueFrom(
      this.http.get<ApiResponse<IBoardColumns>>(`board-columns/boardId/${id}`)
    );
  }

  async create(data: Partial<IBoardColumns>) {
    return await firstValueFrom(
      this.http.post<ApiResponse<IBoardColumns>>(`board-columns`, {
        columns: data.columns,
        boardId: data.boardId,
      })
    );
  }

  async update(
    columns: IBoardColumns['columns'],
    id: IBoardColumns['boardId']
  ) {
    return await firstValueFrom(
      this.http.put<ApiResponse<IBoardColumns>>(`board-columns/boardId/${id}`, {
        columns,
      })
    );
  }
}
