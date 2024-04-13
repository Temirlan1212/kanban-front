import { Component, inject } from '@angular/core';
import { BoardFormComponent } from '../board-form/board-form.component';
import { ApiService } from 'src/modules/api/api.service';
import { MessagesService } from 'src/modules/ui/services/messages.service';
import { Router } from '@angular/router';
import { boardInitialState } from '../../../lib/services/board.service';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.scss'],
})
export class BoardCreateComponent {
  private readonly api = inject(ApiService);
  private readonly messages = inject(MessagesService);
  private readonly router = inject(Router);
  loading: boolean = false;

  async handleSave(form: BoardFormComponent) {
    const { valid, value } = form.getState();

    if (valid) {
      try {
        this.loading = true;
        const res = await this.api.boards.create(value);
        if (res.result.id) {
          await this.api.boardColumns.create({
            ...boardInitialState,
            boardId: res.result.id,
          });
          this.router.navigate(['..'], { queryParamsHandling: 'merge' });
        }
      } catch (err: any) {
        this.messages.error(err?.statusText || err?.message);
      } finally {
        this.loading = false;
      }
    }
  }
}
