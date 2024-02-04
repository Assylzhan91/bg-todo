import {Injectable} from '@angular/core';
import {delay, Observable, of} from "rxjs";

import {CategoryType, TaskType, TestData} from '../data/TestData';

@Injectable()
export class DataHandlerService {
  constructor() {
  }

  getCategories(): Observable<CategoryType[]> {
    return of(TestData.categories).pipe(delay(1000))
  }

  getTasks(): Observable<TaskType[]> {
    return of(TestData.tasks)
  }

  getTaskByCategory(category: CategoryType): TaskType[] {
    return TestData.tasks.filter((task) => task.category === category)
  }
}
