import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { BoardListComponent } from './components/boards/board-list/board-list.component';
import { BoardCreateComponent } from './components/boards/board-create/board-create.component';
import { BoardUpdateComponent } from './components/boards/board-update/board-update.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: 'create',
        component: BoardCreateComponent,
      },
      {
        path: 'update/:id',
        component: BoardUpdateComponent,
      },
      {
        path: '',
        component: BoardListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
