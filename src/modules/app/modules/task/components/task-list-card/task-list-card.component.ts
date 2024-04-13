import { Component, Input, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/modules/api/api.service';
import { ITask, ServerTimestampt } from 'src/modules/api/models/task.model';
import { taskInitialState } from '../../../board/lib/services/board-task.service';

@Component({
  selector: 'app-task-list-card',
  templateUrl: './task-list-card.component.html',
  styleUrls: ['./task-list-card.component.scss'],
})
export class TaskListCardComponent implements OnInit {
  private readonly api = inject(ApiService);
  public readonly dictionary = this.api.dictionary;
  @Input('value') task: Omit<ITask, 'id'> & Partial<ServerTimestampt> =
    taskInitialState;

  executorsConverter(value: string) {
    return value.split(',');
  }

  ngOnInit(): void {}
}
