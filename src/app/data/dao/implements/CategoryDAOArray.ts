import {CategoryDAO} from '../interfaces/CategoryDAO'
import {Category} from '../../../models/category'
import {EMPTY, Observable, of} from 'rxjs'
import {PriorityType, TestData} from '../../TestData'

export class CategoryDAOArray implements CategoryDAO {
  add(item: Category): Observable<Category> | unknown {
    return undefined
  }

  delete(id: number): Observable<Category[]> {
    TestData.categories = TestData.categories.filter((category) => category.id !== id)
    return of(TestData.categories)
  }

  get(id: number): Observable<Category> | unknown {
    return undefined
  }

  getAllCategory(): Observable<Category[]> {
    return of(TestData.categories)
  }

  getAllPriorities(): Observable<PriorityType[]> {
    return of(TestData.priorities)
  }

  search(title: string): Observable<Category[]> | unknown {
    return undefined
  }

  update(category: Category): Observable<Category> {
    const categoryTmp = TestData.categories.find((t) => t.id == category.id)
    if (categoryTmp) {
      TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category)
      return of(category)
    }

    return EMPTY
  }
}
