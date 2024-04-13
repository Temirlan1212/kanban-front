import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/modules/api/api.service';
import { LoadingStatus } from 'src/modules/api/models/data-access.model';
import { ITask } from 'src/modules/api/models/task.model';

export const taskInitialState: ITask = {
  title: '',
  status: '',
  deadline: '',
  priority: '',
  executors: [],
  id: '',
};

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly api = inject(ApiService);
  public readonly status$: BehaviorSubject<LoadingStatus> =
    new BehaviorSubject<LoadingStatus>('init');
  public readonly tasks$: BehaviorSubject<Record<string, ITask>> =
    new BehaviorSubject<Record<string, ITask>>({});

  getTask(id: ITask['id']) {
    return this.tasks$.value?.[id] || taskInitialState;
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
}
