import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/modules/api/api.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent {
  private readonly api = inject(ApiService);
  form: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
  });

  @Input() set value(v: any | null) {
    if (v == null) {
      this.form.reset();
    } else {
      this.form.patchValue({
        title: v.title,
      });
    }
  }

  public getState(): { value: any; valid: boolean; touched: boolean } {
    const state = this.api.form.getState(this.form);
    return state;
  }
}
