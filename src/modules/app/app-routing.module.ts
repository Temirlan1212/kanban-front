import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { NotFoundPageComponent } from '../ui/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    title: '',
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
    data: {
      position: 'top',
      icon: 'edit-text',
      class: 'homepage divider-bottom',
      panel: true,
      active: false,
      onlyDesktop: true,
    },
  },
  {
    title: 'Board',
    path: 'board',
    data: {
      position: 'top',
      icon: 'list',
      panel: true,
      toggle: true,
      active: true,
    },
    canActivate: [],
    loadChildren: () =>
      import('./modules/board/board.module').then((m) => m.BoardModule),
  },
  {
    title: 'About system',
    path: 'about',
    data: { position: 'top', icon: 'info-circle', active: true },
    canActivate: [],
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    title: 'NotFoundPage',
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
