import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {SchoolLevel, SchoolLevelResponse} from './school-level';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SchoolLevelService} from '../../services/school-level.service';
import {catchError, finalize} from 'rxjs/operators';

export class SchoolLevelDataSource implements DataSource<SchoolLevel>{
  private todoSubject = new BehaviorSubject<SchoolLevel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private schoolLevelService: SchoolLevelService) { }

  connect(collectionViewer: CollectionViewer): Observable<SchoolLevel[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadLevels(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.schoolLevelService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: SchoolLevelResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
