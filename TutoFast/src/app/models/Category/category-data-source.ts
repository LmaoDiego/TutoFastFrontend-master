import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Category, CategoryResponse} from './category';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CategoryService} from '../../services/category.service';
import {catchError, finalize} from 'rxjs/operators';

export class CategoryDataSource implements DataSource<Category>{
  private todoSubject = new BehaviorSubject<Category[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private categoryService: CategoryService) { }

  connect(collectionViewer: CollectionViewer): Observable<Category[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadCategories(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.categoryService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: CategoryResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
