import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Student, StudentResponse} from './student';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {StudentService} from '../../services/student.service';
import {catchError, finalize} from 'rxjs/operators';

export class StudentDataSource implements DataSource<Student>{
  private todoSubject = new BehaviorSubject<Student[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private studentService: StudentService) { }

  connect(collectionViewer: CollectionViewer): Observable<Student[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadStudents(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.studentService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: StudentResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
