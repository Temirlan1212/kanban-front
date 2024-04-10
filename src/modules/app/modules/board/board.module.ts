import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, BoardRoutingModule, TranslateModule],
  providers: [TranslatePipe],
})
export class BoardModule {}
