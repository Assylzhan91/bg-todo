import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay } from "rxjs";

import {CategoryType, TaskType, TestData} from '../data/TestData';
import {TaskDAOArray} from "../data/dao/implements/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/implements/CategoryDAOArray";

@Injectable()
export class DataHandlerService {
  task$ = new BehaviorSubject<TaskType[]>([])

  taskDAOArray =  inject(TaskDAOArray)
  categoryDAOArray =  inject(CategoryDAOArray)

  getAllCategories$ = this.categoryDAOArray.getAll().pipe(delay(3000))
  getAllTasks$ = this.taskDAOArray.getAll().pipe(delay(2000))

  fillTaskByCategory(category: CategoryType): void {
    this.task$.next(TestData.tasks.filter((task) => task.category === category))
  }
}
