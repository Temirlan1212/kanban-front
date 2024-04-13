import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/modules/api/api.service';
import {
  IBoardColumn,
  IBoardColumns,
} from 'src/modules/api/models/boards.model';
import { LoadingStatus } from 'src/modules/api/models/data-access.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from 'src/modules/api/models/task.model';
import { taskInitialState } from './board-task.service';

export const boardInitialColumnState: IBoardColumn = {
  id: String(Date.now()),
  tasksIds: [],
  title: '',
};

export const boardInitialState: Pick<IBoardColumns, 'columns'> = {
  columns: [],
};

@Injectable({ providedIn: 'root' })
export class BoardColumnService {
  private readonly api = inject(ApiService);
  public readonly status$: Subject<LoadingStatus> =
    new Subject<LoadingStatus>();
  public readonly columns$: BehaviorSubject<IBoardColumns['columns']> =
    new BehaviorSubject<IBoardColumns['columns']>([]);

  getStateColumns() {
    return this.columns$.value;
  }

  getColumnsIds() {
    return this.columns$.value.map((column) => column.id);
  }

  async getColumns(id: IBoardColumns['id']) {
    try {
      this.status$.next('loading');
      const response = await this.api.boardColumns.findOne(id);
      if (response.ok) this.columns$.next(response.result.columns);
    } finally {
      this.status$.next('loaded');
    }
  }

  public async dropGrid(event: CdkDragDrop<string[]>, id: IBoardColumns['id']) {
    moveItemInArray(
      this.getStateColumns(),
      event.previousIndex,
      event.currentIndex
    );
    this.updateColumns(this.getStateColumns(), id);
  }

  public dropTask(event: CdkDragDrop<string[]>, id: IBoardColumns['id']): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateColumns(this.getStateColumns(), id);
  }

  async updateColumns(
    columns: IBoardColumns['columns'],
    id: IBoardColumns['id']
  ) {
    let res: IBoardColumns['columns'] | null = null;
    try {
      this.status$.next('loading');
      const response = await this.api.boardColumns.update(columns, id);
      if (response.ok) res = response.result.columns;
    } finally {
      this.status$.next('loaded');
    }
    return res;
  }

  async updateColumnTitle(
    input: string | null,
    id: IBoardColumns['id'],
    columnId: IBoardColumn['id']
  ) {
    const value = this.getStateColumns();
    const newValue = value.map((item) => {
      if (item.id != columnId) return item;
      return { ...item, title: input } as IBoardColumn;
    });
    this.updateColumns(newValue, id);
  }

  async addColumn(id: IBoardColumns['id']) {
    const value = this.getStateColumns();
    const newValue = [
      ...value,
      { ...boardInitialColumnState, id: String(Date.now()), tasksIds: [] },
    ];
    this.columns$.next(newValue);
    this.updateColumns(newValue, id);
  }

  async removeColumn(
    id: IBoardColumns['id'],
    boardId: IBoardColumns['boardId']
  ) {
    const value = this.getStateColumns();
    const filteredValue = value.filter((item) => item.id !== id);
    this.columns$.next(filteredValue);
    this.updateColumns(filteredValue, boardId);
  }

  async addTask(
    boardId: IBoardColumns['boardId'],
    columnId: IBoardColumn['id']
  ) {
    try {
      this.status$.next('loading');
      const res = await this.api.taskApi.create(taskInitialState);

      if (res.ok) {
        const id = res.result.id;
        const columns = this.getStateColumns();
        const newColumns = columns.map((column) => {
          if (column.id == columnId) column.tasksIds.unshift(id);
          return column;
        });
        this.columns$.next(newColumns);
        this.updateColumns(newColumns, boardId);
      }
    } finally {
      this.status$.next('loaded');
    }
  }

  async removeTask(
    boardId: IBoardColumns['boardId'],
    columnId: IBoardColumn['id'],
    taskId: ITask['id']
  ) {
    try {
      this.status$.next('loading');
      const res = await this.api.taskApi.delete(taskId);
      if (res.ok) {
        const columns = this.getStateColumns();
        const newColumns = columns.map((column) => {
          if (column.id != columnId) return column;
          return {
            ...column,
            tasksIds: column.tasksIds.filter((id) => id != taskId),
          } as IBoardColumn;
        });
        this.columns$.next(newColumns);
        this.updateColumns(newColumns, boardId);
      }
    } finally {
      this.status$.next('loaded');
    }
  }
}
