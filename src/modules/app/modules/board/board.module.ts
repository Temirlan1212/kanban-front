import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidePanelComponent } from 'src/modules/ui/components/side-panel/side-panel.component';
import { ToggleButtonComponent } from 'src/modules/ui/components/toggle-button/toggle-button.component';
import { BoardListComponent } from './components/board-list/board-list.component';

@NgModule({
  declarations: [BoardComponent, BoardListComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    TranslateModule,
    DragDropModule,
    SidePanelComponent,
    ToggleButtonComponent,
  ],
  providers: [TranslatePipe],
})
export class BoardModule {}
