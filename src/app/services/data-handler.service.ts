import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable} from "rxjs";

import {CategoryType, TaskType} from '../data/TestData';
import {TaskDAOArray} from "../data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/implements/CategoryDAOArray";
import {Priority} from "../models/priority";

@Injectable()
export class DataHandlerService {
  task$ = new BehaviorSubject<TaskType[]>([])

  taskDAOArray =  inject(TaskDAOArray)
  categoryDAOArray =  inject(CategoryDAOArray)

  getAllCategories$ = this.categoryDAOArray.getAll().pipe(delay(3000))
  getAllTasks$ = this.taskDAOArray.getAll().pipe(delay(2000))

  searchTasks(
    searchTasks: CategoryType,
    searchText: string | null,
    status: boolean | null,
    priority: Priority | null,
  ): Observable<TaskType[]>{
    return this.taskDAOArray.search(searchTasks, searchText, status, priority)
  }

}
