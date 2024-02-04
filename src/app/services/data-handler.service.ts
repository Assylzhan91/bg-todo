import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

import {CategoryType, TaskType, TestData} from '../data/TestData';

@Injectable()
export class DataHandlerService {
  constructor() { }

  getCategories(): Observable<CategoryType[]> {
    return of(TestData.categories)
  }

  getTasks(): Observable<TaskType[]> {
    return of(TestData.tasks)
  }
}
