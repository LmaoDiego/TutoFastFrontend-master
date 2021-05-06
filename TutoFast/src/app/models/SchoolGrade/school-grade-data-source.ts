import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {SchoolGrade, SchoolGradeResponse} from './school-grade';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SchoolGradeService} from '../../services/school-grade.service';
import {catchError, finalize} from 'rxjs/operators';

export class SchoolGradeDataSource implements DataSource<SchoolGrade>{
  private todoSubject = new BehaviorSubject<SchoolGrade[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private schoolGradeService: SchoolGradeService) { }

  connect(collectionViewer: CollectionViewer): Observable<SchoolGrade[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadGrades(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.schoolGradeService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: SchoolGradeResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }

}
