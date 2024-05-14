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

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'categoriesComponent',
})
export class CategoriesComponent implements OnChanges {
  @Input() categories!: CategoryType[] | null
  @Input() optionTemplate!: TemplateRef<unknown>
  @Input() selectedCategory!: CategoryType

  @Output() selectedCategoryHandler = new EventEmitter<CategoryType>()

  selectedCategories!: CategoryType

  ngOnChanges(): void {
    this.selectedCategories = this.selectedCategory
  }
}
