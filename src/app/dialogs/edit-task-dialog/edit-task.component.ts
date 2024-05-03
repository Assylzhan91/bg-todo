import {ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";

import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {CategoryDAOArray} from "../../data/dao/implements/CategoryDAOArray";
import {DataHandlerService} from "../../services/data-handler.service";
import {TaskDAOArray} from "../../data/dao/implements/TaskDAOArray";
import {PriorityType, TaskType} from "../../data/TestData";
import {Category} from "../../models/category";


@Component({
  selector: 'dialog-edit-task',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatFormFieldModule,
    LoadingComponent,
    MatDialogModule,
    MatInputModule,
    MatIconButton,
    CommonModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel,
    MatInput,
    MatIcon
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    DataHandlerService,
    CategoryDAOArray,
    TaskDAOArray,
  ]
})
export class EditTaskComponent implements OnInit{
  dialogRef = inject(MatDialogRef<EditTaskComponent>)
  dataHandlerService = inject(DataHandlerService)
  data = inject(MAT_DIALOG_DATA)

  priorities$: Observable<PriorityType[]> = this.dataHandlerService.getAllPriorities$
  categories$: Observable<Category[]> = this.dataHandlerService.getAllCategories$

  dialogTitle: TaskType = this.data[1]
  task: TaskType = this.data[0]
  tmpTitle: string = this.task.title

  combined$ = forkJoin([this.categories$, this.priorities$]);

  @ViewChild('inputDate') inputDate!: TemplateRef<any>;
  tmpDate: Date | undefined = this.task.date;

  ngOnInit(): void {
    console.log(this.task)
  }

  onConfirm(): void {

    if (!this.tmpTitle.length) {
      return
    }
    this.task.title = this.tmpTitle
    this.task.date = this.tmpDate

    this.dialogRef.close({task: this.task, typeAction: 'confirm'})
  }

  onDelete(): void {
    this.dialogRef.close({task: this.task, typeAction:  'remove'})
  }

  completeTask(): void {
    this.dialogRef.close({task: this.task, typeAction: 'complete'})
  }
}
