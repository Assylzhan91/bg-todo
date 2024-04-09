import {CategoryDAO} from "../interfaces/CategoryDAO";
import {Category} from "../../../models/category";
import {Observable, of} from "rxjs";
import {PriorityType, TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  add(item: Category): Observable<Category> | unknown{
    return undefined;
  }

  delete(id: number): Observable<Category> | unknown{
    return undefined;
  }

  get(id: number): Observable<Category> | unknown{
    return undefined;
  }

  getAllCategory(): Observable<Category[]>{
    return of(TestData.categories);
  }

  getAllPriorities(): Observable<PriorityType[]>{
    return of(TestData.priorities);
  }

  search(title: string): Observable<Category[]> | unknown{
    return undefined;
  }

  update(item: Category): Observable<Category> | unknown{
    return undefined;
  }

}
