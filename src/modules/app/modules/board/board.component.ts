import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Board } from './models/board.model';
import { Column } from './models/column.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: Board = new Board('Board', [
    new Column('Ideas', '21', [
      'Some random idea',
      'This is another random idea',
    ]),
    new Column('Research', '32', ['Lorem ipsum', 'foo']),
  ]);

  constructor() {}

  public ngOnInit(): void {}

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
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
