import {CommonDAO} from "./CommonDAO";
import {Task} from "../../../models/task";
import {Category} from "../../../models/category";
import {Priority} from "../../../models/priority";
import {Observable} from "rxjs";

export interface TaskDAO extends CommonDAO<Task> {

  search(
    category: Category,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Observable<Task[]>

  getCompletedCountInCategory( category: Category): Observable<number>

  getUncompletedCountInCategory( category: Category): Observable<number>

  getTotalCountInCategory( category: Category): Observable<number>

  getTotalCount(category: Category): Observable<number>
  

}
