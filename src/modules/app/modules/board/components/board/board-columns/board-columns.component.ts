import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { SidePanelService } from 'src/modules/ui/services/side-panel.service';
import { StoreService } from 'src/modules/ui/services/store.service';

@Component({
  selector: 'app-board-columns',
  templateUrl: './board-columns.component.html',
  styleUrls: ['./board-columns.component.scss'],
})
export class BoardColumnsComponent {
  private store = inject(StoreService);
  public sidePanelService = inject(SidePanelService);

  public board = [
    {
      name: 'tim',
      id: '21',
      tasks: ['Some random idea', 'This is another random idea'],
    },
    {
      name: 'tsdfim',
      id: '32',
      tasks: ['Some random iddsfea', 'This sdfis another random idea'],
    },
  ];

  public ngOnInit(): void {}

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board, event.previousIndex, event.currentIndex);
    console.log(this.board);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.board);
  }
}
