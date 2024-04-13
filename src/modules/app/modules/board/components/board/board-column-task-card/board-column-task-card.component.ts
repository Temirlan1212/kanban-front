import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BoardTaskService } from '../../../lib/services/board-task.service';
import { TaskFormComponent } from 'src/modules/app/modules/task/components/task-form/task-form.component';
import { QuestionDialogComponent } from 'src/modules/ui/components/question-dialog/question-dialog.component';
import { ApiService } from 'src/modules/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-column-task-card',
  templateUrl: './board-column-task-card.component.html',
  styleUrls: ['./board-column-task-card.component.scss'],
})
export class BoardColumnTaskCardComponent implements OnInit, OnDestroy {
  private readonly taskService = inject(BoardTaskService);
  private readonly api = inject(ApiService);
  public readonly status$ = this.taskService.status$;
  public readonly dictionary = this.api.dictionary;

  task = this.taskService.getCardTask('');
  actionsLoading: boolean = false;
  subs: Subscription[] = [];

  @Input('taskId') taskId = '';

  private updateTask(id: string) {
    this.task = this.taskService.getCardTask(id);
  }

  async handleSave(form: TaskFormComponent, dialog: QuestionDialogComponent) {
    const { valid, value } = form.getState();
    if (valid) {
      this.actionsLoading = true;
      await this.taskService.updateTask(this.taskId, value);
      this.actionsLoading = false;
      dialog.close();
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.taskId) {
      this.updateTask(this.taskId);
      if (!this.task.id) await this.taskService.getTasks(this.taskId);
    }
    const sub = this.taskService.tasks$.subscribe(() =>
      this.updateTask(this.taskId)
    );
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.map((sub) => sub.unsubscribe());
  }
}
