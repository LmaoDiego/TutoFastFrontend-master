import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Course, CourseResponse} from './course';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CourseService} from '../../services/course.service';
import {catchError, finalize} from 'rxjs/operators';

export class CourseDataSource implements DataSource<Course>{
  private todoSubject = new BehaviorSubject<Course[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private courseService: CourseService) { }

   connect(collectionViewer: CollectionViewer): Observable<Course[]> {
     return this.todoSubject.asObservable();
   }

   disconnect(collectionViewer: CollectionViewer): void {
     this.todoSubject.complete();
     this.loadingSubject.complete();
     this.countSubject.complete();
   }

  loadCourses(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.courseService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: CourseResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
