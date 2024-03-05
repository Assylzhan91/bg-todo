// CRUD

export interface CommonDAO<T>{
  add(item: T): T

  getItem(id: number): T

  delete(id: number): T

  update(item: T): T

  update(item: T): T
}
