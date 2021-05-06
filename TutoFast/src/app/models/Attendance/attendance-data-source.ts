import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Attendance, AttendanceResponse} from './attendance';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AttendanceService} from '../../services/attendance.service';
import {catchError, finalize} from 'rxjs/operators';

export class AttendanceDataSource implements DataSource<Attendance>{
  private todoSubject = new BehaviorSubject<Attendance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private attendanceService: AttendanceService) { }

  connect(collectionViewer: CollectionViewer): Observable<Attendance[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadAttendances(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.attendanceService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: AttendanceResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
