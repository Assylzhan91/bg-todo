import {TaskDAO} from "../interfaces/TaskDAO";
import {Task} from "../../../models/task";
import {Observable} from "rxjs";
import {Category} from "../../../models/category";
import {Priority} from "../../../models/priority";

export class TaskDAOArray implements TaskDAO {
  add(item: Task): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return undefined;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(item: Task): Observable<Task> {
    return undefined;
  }

}
