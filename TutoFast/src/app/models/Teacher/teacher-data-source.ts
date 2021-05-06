import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Teacher, TeacherResponse} from './teacher';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TeacherService} from '../../services/teacher.service';
import {catchError, finalize} from 'rxjs/operators';

export class TeacherDataSource implements DataSource<Teacher>{
  private todoSubject = new BehaviorSubject<Teacher[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private teacherService: TeacherService) { }

  connect(collectionViewer: CollectionViewer): Observable<Teacher[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadTeachers(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.teacherService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: TeacherResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
