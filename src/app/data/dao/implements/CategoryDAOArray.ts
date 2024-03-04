import {CategoryDAO} from "../interfaces/CategoryDAO";
import {Category} from "../../../models/category";
import {Observable} from "rxjs";

export class CategoryDAOArray implements CategoryDAO {

  add(item: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return undefined;
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(item: Category): Observable<Category> {
    return undefined;
  }

}
