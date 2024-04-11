import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";

import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {CategoryDAOArray} from "../../data/dao/implements/CategoryDAOArray";
import {DataHandlerService} from "../../services/data-handler.service";
import {TaskDAOArray} from "../../data/dao/implements/TaskDAOArray";
import {Category} from "../../models/category";
import {TaskType} from "../../data/TestData";

@Component({
  selector: 'dialog-edit-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    LoadingComponent,
    MatDialogModule,
    MatIconButton,
    CommonModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel,
    MatInput,
    MatIcon,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataHandlerService, TaskDAOArray, CategoryDAOArray]
})
export class EditTaskComponent {
  dialogRef = inject(MatDialogRef<EditTaskComponent>)
  dataHandlerService = inject(DataHandlerService)
  data = inject(MAT_DIALOG_DATA)

  categories$: Observable<Category[]> = this.dataHandlerService.getAllCategories$
  priorities$: Observable<Category[]> = this.dataHandlerService.getAllPriorities$

  task: TaskType = this.data[0]
  dialogTitle: TaskType = this.data[1]
  tmpTitle: string = this.task.title

  combined$ = forkJoin({
    allCategories: this.categories$,
    allPriorities: this.priorities$
  });


  onConfirm(): void {
    if (!this.tmpTitle.length) {
      return
    }
    this.task.title = this.tmpTitle

    this.dialogRef.close({task: this.task, typeAction: 'confirm'})
  }

  onDelete(): void {
    this.dialogRef.close({task: this.task, typeAction:  'remove'})
  }
}
