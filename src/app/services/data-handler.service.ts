import { inject, Injectable } from '@angular/core';
import { delay, Observable} from "rxjs";

import {CategoryType, TaskType} from '../data/TestData';
import {TaskDAOArray} from "../data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/implements/CategoryDAOArray";
import {Priority} from "../models/priority";
import {Task} from "../models/task";

@Injectable()
export class DataHandlerService {
  taskDAOArray =  inject(TaskDAOArray)
  categoryDAOArray =  inject(CategoryDAOArray)

  getAllCategories$ = this.categoryDAOArray.getAll().pipe(delay(2000))
  getAllTasks$ = this.taskDAOArray.getAll().pipe(delay(300))

  searchTasks(
    searchTasks: CategoryType,
    searchText: string | null,
    status: boolean | null,
    priority: Priority | null,
  ): Observable<TaskType[]>{
    return this.taskDAOArray.search(searchTasks, searchText, status, priority)
  }

  updateTask(task: Task): Observable<Task>{
    return this.taskDAOArray.update(task)
  }

}
