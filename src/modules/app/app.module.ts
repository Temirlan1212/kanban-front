import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiInterceptorService } from '../api/api-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationHostDirective } from '../ui/components/notification/notification-host.directive';
import { SidenavComponent } from '../ui/components/sidenav/sidenav.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../ui/services/language.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { boardListFeature } from './modules/board/lib/states/board-list/board-list.reducer';
import { boardListEffects } from './modules/board/lib/states/board-list/board-list.effects';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SidenavComponent,
    NotificationHostDirective,
    HttpClientModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageService,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [
    provideEffects(boardListEffects),
    provideStore({
      [boardListFeature.name]: boardListFeature.reducer,
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ApiInterceptorService,
      multi: true,
    },
    LanguageService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
