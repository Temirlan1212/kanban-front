import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/modules/api/api.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  private readonly api = inject(ApiService);
  public readonly statuses = this.api.dictionary.getStatuses();
  public readonly priorities = this.api.dictionary.getPriorities();
  public readonly executorsList = this.api.dictionary.getExecutors();

  form: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    status: new FormControl<string | null>(null, Validators.required),
    deadline: new FormControl<string | null>(null, Validators.required),
    priority: new FormControl<string | null>(null, Validators.required),
    executors: new FormControl<string[] | null>(null, Validators.required),
  });

  @Input() set value(v: any | null) {
    if (v == null) {
      this.form.reset();
    } else {
      this.form.patchValue({
        title: v.title,
        status: v.status,
        deadline: v.deadline,
        priority: v.priority,
        executors: v.executors,
      });
    }
  }

  public getState(): { value: any; valid: boolean; touched: boolean } {
    const state = this.api.form.getState(this.form);
    return state;
  }
}
