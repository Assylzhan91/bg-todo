import {CommonModule} from '@angular/common'
import {
  ChangeDetectionStrategy,
  EventEmitter,
  TemplateRef,
  OnChanges,
  Component,
  Output,
  Input,
} from '@angular/core'

import {CategoryType} from '../../data/TestData'
import {MatIcon} from '@angular/material/icon'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnChanges {
  @Input() categories!: CategoryType[] | null
  @Input() optionTemplate!: TemplateRef<unknown>
  @Input() selectedCategory!: CategoryType

  @Output() selectedCategoryHandler = new EventEmitter<CategoryType>()

  selectedCategories!: CategoryType
  indexMouseMove!: null | number | undefined

  ngOnChanges(): void {
    this.selectedCategories = this.selectedCategory
  }

  showEditIcon(index?: number | null): void {
    this.indexMouseMove = index && index
  }
}
