import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {StudentGoal, StudentGoalResponse} from "../StudentGoal/student-goal";
import {BehaviorSubject, Observable, of} from "rxjs";
import {StudentGoalService} from "../../services/student-goal.service";
import {catchError, finalize} from "rxjs/operators";

export class StudentGoalDataSource implements DataSource<StudentGoal>{
  private todoSubject = new BehaviorSubject<StudentGoal[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private studentGoalService: StudentGoalService) { }

  connect(collectionViewer: CollectionViewer): Observable<StudentGoal[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadStudentGoals(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.studentGoalService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: StudentGoalResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
