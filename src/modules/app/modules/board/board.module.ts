import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, BoardRoutingModule, TranslateModule, DragDropModule],
  providers: [TranslatePipe],
})
export class BoardModule {}
