import { Component, Input, OnInit, inject } from '@angular/core';
import { TaskService } from '../../../lib/services/task.service';

@Component({
  selector: 'app-board-column-task-card',
  templateUrl: './board-column-task-card.component.html',
  styleUrls: ['./board-column-task-card.component.scss'],
})
export class BoardColumnTaskCardComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  public readonly status$ = this.taskService.status$;
  task = this.taskService.getTask('');

  @Input('taskId') taskId = '';

  async ngOnInit(): Promise<void> {
    if (this.taskId) {
      this.task = this.taskService.getTask(this.taskId);
      if (!this.task.id) {
        await this.taskService.getTasks(this.taskId);
        this.task = this.taskService.getTask(this.taskId);
      }
    }
  }
}
