import {CategoryDAO} from "../interfaces/CategoryDAO";
import {Category} from "../../../models/category";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

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

  getAll(): Observable<Category[]>{
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> | unknown{
    return undefined;
  }

  update(item: Category): Observable<Category> | unknown{
    return undefined;
  }

}
