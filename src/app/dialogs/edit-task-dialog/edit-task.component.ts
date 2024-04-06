import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskType} from "../../data/TestData";

@Component({
  selector: 'dialog-edit-task',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent {
  dialogRef =  inject(MatDialogRef<EditTaskComponent>)
  data =  inject(MAT_DIALOG_DATA)

  task: TaskType = this.data[0]
  dialogTitle: TaskType = this.data[1]
}
