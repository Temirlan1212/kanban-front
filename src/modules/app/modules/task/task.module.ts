import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidePanelComponent } from 'src/modules/ui/components/side-panel/side-panel.component';
import { ToggleButtonComponent } from 'src/modules/ui/components/toggle-button/toggle-button.component';
import { SvgIconComponent } from 'src/modules/ui/components/svg-icon/svg-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from 'src/modules/ui/components/form-field/form-field.component';
import { InputComponent } from 'src/modules/ui/components/input/input.component';
import { LoadingComponent } from 'src/modules/ui/components/loading/loading.component';
import { SkeletonComponent } from 'src/modules/ui/components/skeleton/skeleton.component';
import { InputSelectComponent } from 'src/modules/ui/components/input-select/input-select.component';
import { DatePickerComponent } from 'src/modules/ui/components/date-picker/date-picker.component';
import { QuestionDialogComponent } from 'src/modules/ui/components/question-dialog/question-dialog.component';
import { DropDialogComponent } from 'src/modules/ui/components/drop-dialog/drop-dialog.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListCardComponent } from './components/task-list-card/task-list-card.component';
import { PaginatorComponent } from 'src/modules/ui/components/paginator/paginator.component';

@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskListCardComponent],
  imports: [
    DropDialogComponent,
    QuestionDialogComponent,
    DatePickerComponent,
    CommonModule,
    TranslateModule,
    DragDropModule,
    SidePanelComponent,
    ToggleButtonComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    FormsModule,
    FormFieldComponent,
    InputComponent,
    LoadingComponent,
    SkeletonComponent,
    InputSelectComponent,
    TaskRoutingModule,
    PaginatorComponent,
  ],
  providers: [TranslatePipe],
})
export class TaskModule {}
