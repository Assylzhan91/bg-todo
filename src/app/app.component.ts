import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {tap} from "rxjs";

import {CategoriesComponent} from "./views/categories/categories.component";
import {DataHandlerService} from "./services/data-handler.service";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskDAOArray} from "./data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "./data/dao/implements/CategoryDAOArray";
import {CategoryType} from "./data/TestData";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataHandlerService, TaskDAOArray, CategoryDAOArray]
})
export class AppComponent implements OnInit{
  dataHandlerService = inject(DataHandlerService)

  tasks$ = this.dataHandlerService.getAllTasks$
  categories$ = this.dataHandlerService.getAllCategories$

  selectedCategory = <CategoryType>{}
  date: Date = new Date()


  constructor(private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {}

  onSelectCategory(category: CategoryType): void{
    if (this.selectedCategory === category) return
    this.selectedCategory = category
    this.tasks$ = this.dataHandlerService
      .searchTasks(this.selectedCategory, null, null, null)
      .pipe(tap(() => this.cdRef.detectChanges()))
  }
}
