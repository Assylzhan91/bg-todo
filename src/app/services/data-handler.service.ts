import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from "rxjs";

import {CategoryType, TaskType, TestData} from '../data/TestData';

@Injectable()
export class DataHandlerService {
  task$ = new BehaviorSubject<TaskType[]>([])
  categories$ = new BehaviorSubject<CategoryType[]>(TestData.categories).asObservable().pipe(delay(1000))

  constructor() {
  }

  fillTasks(): TaskType[] {
    this.task$.next(TestData.tasks)
    return this.task$.getValue()
  }

  fillTaskByCategory(category: CategoryType): void {
    this.task$.next(TestData.tasks.filter((task) => task.category === category))
  }
}
