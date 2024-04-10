import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, TranslateModule],
  providers: [TranslatePipe],
})
export class AboutModule {}
