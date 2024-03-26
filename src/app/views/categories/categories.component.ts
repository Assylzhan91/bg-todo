import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {Observable} from "rxjs";

import {DataHandlerService} from "../../services/data-handler.service";
import {CategoryType} from "../../data/TestData";
import {Category} from "../../models/category";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit{
  @Input() categories!: CategoryType[]
  @Input() optionTemplate!: TemplateRef<any>
  selectedCategories!: CategoryType

  @Output() selectedCategory = new EventEmitter<CategoryType>()


  constructor(private dataHandlerService: DataHandlerService) {}

  ngOnInit(): void {
    console.log(this.categories)
  }

  showTaskByCategory(category: Category): void {
    this.selectedCategories = category
    this.dataHandlerService.fillTaskByCategory(category)
    this.selectedCategory.emit(category)
  }

}
