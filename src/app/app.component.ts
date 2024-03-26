import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

import {CategoriesComponent} from "./views/categories/categories.component";
import {DataHandlerService} from "./services/data-handler.service";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskDAOArray} from "./data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "./data/dao/implements/CategoryDAOArray";
import {concat, concatAll, concatMap, filter, map, Observable, of, tap} from "rxjs";
import {CategoryType} from "./data/TestData";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataHandlerService, TaskDAOArray, CategoryDAOArray]
})
export class AppComponent {
  dataHandlerService = inject(DataHandlerService)

  tasks$ = this.dataHandlerService.getAllTasks$
  categories$ = this.dataHandlerService.getAllCategories$

  date: Date = new Date()

  sorting (category: CategoryType): void{
    if(category.id === 0){
      this.tasks$ = this.dataHandlerService.getAllTasks$
      return
    }
    this.tasks$ = this.dataHandlerService.getAllTasks$.pipe(map(tasks => tasks.filter(task=> task.category?.id == category.id)))
  }
}
