import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Parent, ParentResponse} from './parent';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ParentService} from '../../services/parent.service';
import {catchError, finalize} from 'rxjs/operators';

export class ParentDataSource implements DataSource<Parent>{
  private todoSubject = new BehaviorSubject<Parent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private parentService: ParentService) { }

  connect(collectionViewer: CollectionViewer): Observable<Parent[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadParents(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.parentService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: ParentResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
