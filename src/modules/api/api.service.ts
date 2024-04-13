import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormApi } from './classes/form.api';
import { UserApi } from './classes/user.api';
import { BoardsApi } from './classes/boards';
import { BoardColumnsApi } from './classes/board-columns';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public readonly form: FormApi;
  public readonly user: UserApi;
  public readonly boards: BoardsApi;
  public readonly boardColumns: BoardColumnsApi;

  constructor(private http: HttpClient) {
    this.form = new FormApi();
    this.user = new UserApi(this.http);
    this.boards = new BoardsApi(this.http);
    this.boardColumns = new BoardColumnsApi(this.http);
  }
}
