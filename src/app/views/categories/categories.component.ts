import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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
  selectedCategories!: CategoryType

  constructor(private dataHandlerService: DataHandlerService) {}

  ngOnInit(): void {}

  showTaskByCategory(category: Category): void {
    this.selectedCategories = category
    this.dataHandlerService.fillTaskByCategory(category)
  }

}
