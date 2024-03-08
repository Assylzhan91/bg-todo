import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

import {CategoriesComponent} from "./views/categories/categories.component";
import {DataHandlerService} from "./services/data-handler.service";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskDAOArray} from "./data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "./data/dao/implements/CategoryDAOArray";
import {Observable} from "rxjs";
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

}
