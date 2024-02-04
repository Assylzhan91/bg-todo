import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable, of} from "rxjs";

import {CategoryType, TaskType, TestData} from '../data/TestData';

@Injectable()
export class DataHandlerService {
  task$ = new BehaviorSubject<TaskType[]>([])

  constructor() {
  }

  getCategories(): Observable<CategoryType[]> {
    return of(TestData.categories).pipe(delay(1000))
  }

  fillTasks(): Observable<TaskType[]> {
    this.task$.next(TestData.tasks)
    return this.task$.asObservable()
  }

  fillTaskByCategory(category: CategoryType): void {
    this.task$.next(TestData.tasks.filter((task) => task.category === category))
  }
}
