import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {OutcomeReport, OutcomeReportResponse} from "../OutcomeReport/outcome-report";
import {BehaviorSubject, Observable, of} from "rxjs";
import {OutcomeReportService} from "../../services/outcome-report.service";
import {catchError, finalize} from "rxjs/operators";

export class OutcomeReportDataSource implements DataSource<OutcomeReport>{
  private todoSubject = new BehaviorSubject<OutcomeReport[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private outcomeReportService: OutcomeReportService) { }

  connect(collectionViewer: CollectionViewer): Observable<OutcomeReport[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadOutcomeReports(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.outcomeReportService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: OutcomeReportResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
