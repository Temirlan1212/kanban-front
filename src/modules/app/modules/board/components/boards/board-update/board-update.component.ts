import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/modules/api/api.service';
import { BoardFormComponent } from '../board-form/board-form.component';
import { MessagesService } from 'src/modules/ui/services/messages.service';
import { IBoard } from 'src/modules/api/models/boards.model';

@Component({
  selector: 'app-board-update',
  templateUrl: './board-update.component.html',
  styleUrls: ['./board-update.component.scss'],
})
export class BoardUpdateComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  private readonly messages = inject(MessagesService);
  private readonly router = inject(Router);
  public readonly id = this.route.snapshot.paramMap.get('id');
  board: Partial<IBoard> = { title: '' };
  saveLoading: boolean = false;
  findOneLoading: boolean = false;

  ngOnInit(): void {
    if (this.id) {
      this.findOneLoading = true;
      this.api.boards
        .findOne(this.id)
        .then((data) => (this.board = data.result || { title: '' }))
        .finally(() => (this.findOneLoading = false));
    }
  }

  async handleSave(form: BoardFormComponent) {
    if (!this.id) return;
    const { valid, value } = form.getState();
    if (valid) {
      this.saveLoading = true;
      this.api.boards
        .update(value, this.id)
        .then(() =>
          this.router.navigate(['..'], { queryParamsHandling: 'merge' })
        )
        .catch((err: any) => {
          this.messages.error(err?.statusText || err?.message);
        })
        .finally(() => (this.saveLoading = false));
    }
  }
}
