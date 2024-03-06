// CRUD

export interface CommonDAO<T>{
  add(item: T): T | unknown

  delete(id: number): T  | unknown

  update(item: T): T  | unknown

}
