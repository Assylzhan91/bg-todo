import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {switchMap, tap} from "rxjs";

import {LoadingComponent} from "./shared/components/loading/loading.component";
import {CategoriesComponent} from "./views/categories/categories.component";
import {CategoryDAOArray} from "./data/dao/implements/CategoryDAOArray";
import {DataHandlerService} from "./services/data-handler.service";
import {TaskDAOArray} from "./data/dao/implements/TaskDAOArray";
import {TasksComponent} from "./views/tasks/tasks.component";
import {CategoryType, TaskType} from "./data/TestData";
import {TypeAction} from "./models/edit";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CategoriesComponent,
    TasksComponent,
    LoadingComponent
  ],
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

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {}

  onSelectCategory(category: CategoryType): void{
    if (this.selectedCategory === category) return
    this.selectedCategory = category
    this.tasks$ = this.dataHandlerService
      .searchTasks(this.selectedCategory, null, null, null)
      .pipe(tap(() => this.cdRef.detectChanges()))
  }

  onUpdateTask(event: {task: TaskType, typeAction: TypeAction}): void{
    const {typeAction, task} = event
    if  (typeAction === 'confirm'){
      this.tasks$ = this.dataHandlerService
        .updateTask(task)
        .pipe(
          switchMap(()=>this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null))
        )
    }
    if (typeAction === 'remove') {
      this.tasks$ = this.dataHandlerService
        .deleteTask(task.id)
        .pipe(
          switchMap(()=> this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null)),
          tap(() => this.cdRef.detectChanges())
        )
    }
  }

}
