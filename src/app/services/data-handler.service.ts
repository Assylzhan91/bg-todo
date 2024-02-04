import { Injectable } from '@angular/core';
import { CategoryType, TestData } from '../data/TestData';
import {Observable, of} from "rxjs";

@Injectable()
export class DataHandlerService {
  constructor() { }

  getCategories(): Observable<CategoryType[]> {
    return of(TestData.categories)
  }
}
