import {TaskDAO} from "../interfaces/TaskDAO";
import {Task} from "../../../models/task";
import {EMPTY, Observable, of} from "rxjs";
import {Category} from "../../../models/category";
import {Priority} from "../../../models/priority";
import {TaskType, TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<TaskType[]>{
    return of(TestData.tasks);
  }

  add(item: Task): Observable<Task> | unknown{
    return undefined;
  }

  delete(id: number): Observable<Task> | unknown{
    return undefined;
  }

  get(id: number): Observable<Task> | unknown{
    return undefined;
  }


  getCompletedCountInCategory(category: Category): Observable<number> | unknown{
    return undefined;
  }

  getTotalCount(category: Category): Observable<number> | unknown{
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> | unknown{
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> | unknown{
    return undefined;
  }

  search(category: Category, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]>{
    return of(
      category.id === 0
        ? TestData.tasks
        : TestData.tasks.filter(task=> task.category?.id == category.id)
    )
  }

  update(task: Task): Observable<Task>{
    const taskTmp = TestData.tasks.find(t => t.id == task.id)
    if (taskTmp){
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task)
      return of(task);
    }
    return EMPTY

  }


}
