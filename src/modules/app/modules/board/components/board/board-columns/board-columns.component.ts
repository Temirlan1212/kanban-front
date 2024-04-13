import { Component, HostBinding, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidePanelService } from 'src/modules/ui/services/side-panel.service';
import { BoardColumnService } from '../../../lib/services/board.service';
import { IBoardColumns } from 'src/modules/api/models/boards.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-columns',
  templateUrl: './board-columns.component.html',
  styleUrls: ['./board-columns.component.scss'],
})
export class BoardColumnsComponent {
  private readonly route = inject(ActivatedRoute);
  public readonly boardColumnService = inject(BoardColumnService);
  public activeBoardId = this.route.snapshot.queryParamMap.get('activeBoardId');
  public status$ = this.boardColumnService.status$;
  public columns$ = this.boardColumnService.columns$;
  public sidePanelService = inject(SidePanelService);
  @HostBinding('class.collapsed')
  collapsed: boolean = false;

  public async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (v: any) => {
      const activeBoardId = v?.['activeBoardId'];
      if (!activeBoardId) return;
      this.activeBoardId = activeBoardId;
      await this.boardColumnService.getColumns(activeBoardId);
    });
    this.collapsed = this.sidePanelService.get();
    this.sidePanelService.watch((v) => (this.collapsed = v));
  }

  public handleUpdateColumnTitle(
    value: string | null,
    columnId: IBoardColumns['id']
  ) {
    if (!this.activeBoardId) return;
    this.boardColumnService.updateColumnTitle(
      value,
      this.activeBoardId,
      columnId
    );
  }

  public async handleAddColumn() {
    if (!this.activeBoardId) return;
    this.boardColumnService.addColumn(this.activeBoardId);
  }

  public async handleRemoveColumn(id: IBoardColumns['id']) {
    if (!id || !this.activeBoardId) return;
    this.boardColumnService.removeColumn(id, this.activeBoardId);
  }

  public async handleDropGrid(boards: CdkDragDrop<string[]>) {
    if (!this.activeBoardId) return;
    this.boardColumnService.dropGrid(boards, this.activeBoardId);
  }
}
