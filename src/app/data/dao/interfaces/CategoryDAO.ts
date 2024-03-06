import {CommonDAO} from "./CommonDAO";
import {Category} from "../../../models/category";
import {Observable} from "rxjs";

export interface CategoryDAO extends CommonDAO<Category> {

  search(title: string): Observable<Category[]> | unknown
}
