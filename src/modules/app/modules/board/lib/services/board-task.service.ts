import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/modules/api/api.service';
import { LoadingStatus } from 'src/modules/api/models/data-access.model';
import { ITask } from 'src/modules/api/models/task.model';

export const taskInitialState: Omit<ITask, 'id'> = {
  title: '---',
  status: '1',
  deadline: '1',
  priority: '1',
  executors: '',
};

@Injectable({ providedIn: 'root' })
export class BoardTaskService {
  private readonly api = inject(ApiService);
  public readonly status$: BehaviorSubject<LoadingStatus> =
    new BehaviorSubject<LoadingStatus>('init');
  public readonly tasks$: BehaviorSubject<Record<string, ITask>> =
    new BehaviorSubject<Record<string, ITask>>({});

  getCardTask(id: ITask['id']) {
    const task = this.tasks$.value?.[id] || taskInitialState;
    return { ...task, executors: task.executors.split(',').slice(0, 5) };
  }

  async getTasks(id: ITask['id']) {
    try {
      this.status$.next('loading');
      const { ok, result } = await this.api.taskApi.findOne(id);
      if (ok) this.tasks$.next({ ...this.tasks$.value, [id]: result });
    } finally {
      this.status$.next('loaded');
    }
  }

  async updateTask(id: ITask['id'], data: ITask) {
    try {
      const { ok, result } = await this.api.taskApi.update(id, data);
      if (ok) {
        this.tasks$.next({ ...this.tasks$.value, [id]: result });
      }
    } finally {
    }
  }
}
