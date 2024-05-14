import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core'
import {concatAll, filter, switchMap, tap} from 'rxjs'
import {CommonModule} from '@angular/common'
import {RouterOutlet} from '@angular/router'

import {LoadingComponent} from './shared/components/loading/loading.component'
import {CategoriesComponent} from './views/categories/categories.component'
import {CategoryDAOArray} from './data/dao/implements/CategoryDAOArray'
import {DataHandlerService} from './services/data-handler.service'
import {TaskDAOArray} from './data/dao/implements/TaskDAOArray'
import {TasksComponent} from './views/tasks/tasks.component'
import {CategoryType, TaskType} from './data/TestData'
import {Category} from './models/category'
import {typeAction} from './models/edit'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesComponent, TasksComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataHandlerService, TaskDAOArray, CategoryDAOArray],
})
export class AppComponent implements OnInit {
  dataHandlerService = inject(DataHandlerService)
  cdRef = inject(ChangeDetectorRef)

  tasks$ = this.dataHandlerService.getAllTasks$
  categories$ = this.dataHandlerService.getAllCategories$

  selectedCategory!: CategoryType
  date: Date = new Date()
  categories: Category[] | null = null

  ngOnInit(): void {
    this.categories$
      .pipe(
        tap((categories) => {
          this.categories = categories
        }),
        concatAll(),
        filter((category) => category.id === 0),
      )
      .subscribe((categories) => {
        this.onSelectCategory(categories)
      })
  }

  onSelectCategory(category: CategoryType): void {
    if (this.selectedCategory === category) return
    this.selectedCategory = category
    this.tasks$ = this.dataHandlerService
      .searchTasks(this.selectedCategory, null, null, null)
      .pipe(tap(() => this.cdRef.detectChanges()))
  }

  onUpdateTask(event: {task: TaskType; typeAction: (typeof typeAction)[number]}): void {
    const {typeAction, task} = event
    if (typeAction === 'confirm') {
      this.tasks$ = this.dataHandlerService
        .updateTask(task)
        .pipe(
          switchMap(() =>
            this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null),
          ),
        )
    }
    if (typeAction === 'remove') {
      this.tasks$ = this.dataHandlerService.deleteTask(task.id).pipe(
        switchMap(() =>
          this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null),
        ),
        tap(() => this.cdRef.detectChanges()),
      )
    }
    if (typeAction === 'complete') {
      task.completed = !task.completed
      this.tasks$ = this.dataHandlerService
        .updateTask(task)
        .pipe(
          switchMap(() =>
            this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null),
          ),
        )
    }
  }
}
