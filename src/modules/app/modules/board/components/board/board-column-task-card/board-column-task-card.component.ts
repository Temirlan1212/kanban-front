import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-column-task-card',
  templateUrl: './board-column-task-card.component.html',
  styleUrls: ['./board-column-task-card.component.scss'],
})
export class BoardColumnTaskCardComponent {
  @Input('value') value = '';
}
