import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskType} from "../../data/TestData";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RepositoryInitializerTask} from "@angular-devkit/schematics/tasks";

@Component({
  selector: 'dialog-edit-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatIconButton,
    CommonModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatLabel,
    MatInput,
    MatIcon,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent {
  dialogRef = inject(MatDialogRef<EditTaskComponent>)
  data = inject(MAT_DIALOG_DATA)

  task: TaskType = this.data[0]
  dialogTitle: TaskType = this.data[1]
  tmpTitle: string = this.task.title


  onConfirm(): void {
    if (!this.tmpTitle.length) {
      return
    }
    this.task.title = this.tmpTitle

    this.dialogRef.close(this.task)
  }


}
