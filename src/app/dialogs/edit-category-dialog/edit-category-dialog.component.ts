import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {
  MatDialogActions,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog'
import {MatInput} from '@angular/material/input'

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconButton,
    CommonModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatIcon,
  ],
  templateUrl: './edit-category-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategoryDialogComponent {
  data = inject(MAT_DIALOG_DATA) as {title: string; text: string}
  dialogRef = inject(MatDialogRef)

  onConfirm(title: string): void {
    console.log('title', title)
    this.dialogRef.close({title})
  }

  onCancel() {
    this.dialogRef.close()
  }

  delete(): void {
    this.dialogRef.close({typeAction: 'remove'})
  }
}
