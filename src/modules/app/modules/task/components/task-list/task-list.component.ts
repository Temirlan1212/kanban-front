import { Component, OnInit, inject } from '@angular/core';
import { TaksListService } from '../../lib/services/task-list.service';
import { ITaskQueryParams } from 'src/modules/api/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private readonly taskListService = inject(TaksListService);
  public readonly tasks$ = this.taskListService.tasks$;
  public readonly paginationMeta$ = this.taskListService.paginationMeta$;
  public queries = {
    createdAt: 'desc' as ITaskQueryParams['createdAt'],
    title: '' as ITaskQueryParams['title'],
  };

  async handlePaginationPageChange(page: number) {
    await this.taskListService.getTasks({ perPage: 5, page });
  }

  async handleSortByCreatedAt(createdAt: 'asc' | 'desc') {
    this.queries.createdAt = createdAt;
    await this.taskListService.getTasks({
      perPage: this.paginationMeta$.value.perPage,
      page: this.paginationMeta$.value.currentPage,
      title: this.queries.title,
      createdAt: this.queries.createdAt,
    });
  }

  async handleSearchByTitle(input: string | null) {
    this.queries.title = input || '';
    await this.taskListService.getTasks({
      perPage: this.paginationMeta$.value.perPage,
      page: this.paginationMeta$.value.currentPage,
      title: this.queries.title,
    });
  }

  async ngOnInit(): Promise<void> {
    await this.taskListService.getTasks({ perPage: 5 });
  }
}
