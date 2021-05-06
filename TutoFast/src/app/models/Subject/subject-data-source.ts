import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Subject, SubjectResponse} from './subject';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SubjectService} from '../../services/subject.service';
import {catchError, finalize} from 'rxjs/operators';

export class SubjectDataSource implements DataSource<Subject>{
  private todoSubject = new BehaviorSubject<Subject[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private subjectServices: SubjectService) { }

  connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadSubjects(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.subjectServices.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: SubjectResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
