import {PriorityDAO} from "../interfaces/PriorityDAO";
import {Priority} from "../../../models/priority";
import {Observable} from "rxjs";

export class PriorityDAOArray implements PriorityDAO {
  add(item: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(item: Priority): Observable<Priority> {
    return undefined;
  }





}
