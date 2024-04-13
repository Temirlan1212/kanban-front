import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidePanelComponent } from 'src/modules/ui/components/side-panel/side-panel.component';
import { ToggleButtonComponent } from 'src/modules/ui/components/toggle-button/toggle-button.component';
import { BoardListComponent } from './components/boards/board-list/board-list.component';
import { SvgIconComponent } from 'src/modules/ui/components/svg-icon/svg-icon.component';
import { BoardCreateComponent } from './components/boards/board-create/board-create.component';
import { BoardUpdateComponent } from './components/boards/board-update/board-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './components/boards/board-form/board-form.component';
import { FormFieldComponent } from 'src/modules/ui/components/form-field/form-field.component';
import { InputComponent } from 'src/modules/ui/components/input/input.component';
import { LoadingComponent } from 'src/modules/ui/components/loading/loading.component';
import { BoardColumnsComponent } from './components/board/board-columns/board-columns.component';
import { BoardColumnTaskCardComponent } from './components/board/board-column-task-card/board-column-task-card.component';
import { SkeletonComponent } from 'src/modules/ui/components/skeleton/skeleton.component';
import { TaskFormComponent } from '../task/components/task-form/task-form.component';
import { InputSelectComponent } from 'src/modules/ui/components/input-select/input-select.component';
import { DatePickerComponent } from 'src/modules/ui/components/date-picker/date-picker.component';
import { QuestionDialogComponent } from 'src/modules/ui/components/question-dialog/question-dialog.component';
import { DropDialogComponent } from 'src/modules/ui/components/drop-dialog/drop-dialog.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardListComponent,
    BoardCreateComponent,
    BoardUpdateComponent,
    BoardFormComponent,
    BoardColumnsComponent,
    BoardColumnTaskCardComponent,
    TaskFormComponent,
  ],
  imports: [
    DropDialogComponent,
    QuestionDialogComponent,
    DatePickerComponent,
    CommonModule,
    BoardRoutingModule,
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
  ],
  providers: [TranslatePipe],
})
export class BoardModule {}
