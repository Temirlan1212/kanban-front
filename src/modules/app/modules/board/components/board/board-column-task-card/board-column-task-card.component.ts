import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-column-task-card',
  templateUrl: './board-column-task-card.component.html',
  styleUrls: ['./board-column-task-card.component.scss'],
})
export class BoardColumnTaskCardComponent implements OnInit {
  @Input('value') value = '';

  ngOnInit(): void {
    console.log(this.value, 'DDDDD');
  }
}
