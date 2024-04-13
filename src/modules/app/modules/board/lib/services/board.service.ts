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

  async getStateColumns() {
    return this.columns$.value;
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
      await this.getStateColumns(),
      event.previousIndex,
      event.currentIndex
    );
    this.updateColumns(await this.getStateColumns(), id);
  }

  public drop(event: CdkDragDrop<string[]>): void {
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
    const value = await this.getStateColumns();
    const newValue = value.map((item) => {
      if (item.id != columnId) return item;
      return { ...item, title: input } as IBoardColumn;
    });
    this.updateColumns(newValue, id);
  }

  async addColumn(id: IBoardColumns['id']) {
    const value = await this.getStateColumns();
    const newValue = [
      ...value,
      { ...boardInitialColumnState, id: String(Date.now()) },
    ];
    this.columns$.next(newValue);
    this.updateColumns(newValue, id);
  }

  async removeColumn(
    id: IBoardColumns['id'],
    boardId: IBoardColumns['boardId']
  ) {
    const value = await this.getStateColumns();
    const filteredValue = value.filter((item) => item.id !== id);
    this.columns$.next(filteredValue);
    this.updateColumns(filteredValue, boardId);
  }
}
