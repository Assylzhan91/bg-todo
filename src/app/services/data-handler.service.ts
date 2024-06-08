import {inject, Injectable} from '@angular/core'
import {delay, Observable} from 'rxjs'

import {CategoryType, TaskType} from '../data/TestData'
import {TaskDAOArray} from '../data/dao/implements/TaskDAOArray'
import {CategoryDAOArray} from '../data/dao/implements/CategoryDAOArray'
import {Priority} from '../models/priority'
import {Task} from '../models/task'
import {Category} from '../models/category'

@Injectable()
export class DataHandlerService {
  taskDAOArray = inject(TaskDAOArray)
  categoryDAOArray = inject(CategoryDAOArray)

  getAllCategories$ = this.categoryDAOArray.getAllCategory().pipe(delay(1000))
  getAllPriorities$ = this.categoryDAOArray.getAllPriorities().pipe(delay(3000))
  getAllTasks$ = this.taskDAOArray.getAll().pipe(delay(2000))

  searchTasks(
    searchTasks: CategoryType,
    searchText: string | null,
    status: boolean | null,
    priority: Priority | null,
  ): Observable<TaskType[]> {
    return this.taskDAOArray.search(searchTasks, searchText, status, priority)
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDAOArray.update(task)
  }

  updateCategory(category: CategoryType): Observable<CategoryType> {
    return this.categoryDAOArray.update(category)
  }

  deleteTask(id: number): Observable<Task[]> {
    return this.taskDAOArray.delete(id)
  }

  deleteCategory(id: number): Observable<Category[]> {
    return this.categoryDAOArray.delete(id)
  }
}
