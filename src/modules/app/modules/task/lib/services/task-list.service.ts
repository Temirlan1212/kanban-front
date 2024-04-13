import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/modules/api/api.service';
import { paginationMetaInitState } from 'src/modules/api/constants/data-access.constant';
import {
  LoadingStatus,
  PaginationMeta,
  PaginationResponse,
} from 'src/modules/api/models/data-access.model';
import { ITask, ITaskQueryParams } from 'src/modules/api/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaksListService {
  private readonly api = inject(ApiService);
  public readonly status$: Subject<LoadingStatus> =
    new Subject<LoadingStatus>();
  public readonly tasks$: BehaviorSubject<ITask[]> = new BehaviorSubject<
    ITask[]
  >([]);
  public readonly paginationMeta$: BehaviorSubject<PaginationMeta> =
    new BehaviorSubject<PaginationMeta>(paginationMetaInitState);

  async getTasks(queryParams: Partial<ITaskQueryParams>) {
    try {
      this.status$.next('loading');
      const res = await this.api.taskApi.findAll(queryParams);
      if (res.ok) {
        this.tasks$.next(res.result.data);
        this.paginationMeta$.next(res.result.meta);
      }
    } finally {
      this.status$.next('loaded');
    }
  }
}
