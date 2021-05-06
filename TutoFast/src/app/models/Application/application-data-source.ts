import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Application, ApplicationResponse} from "./application";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {ApplicationService} from "../../services/application.service";

export class ApplicationDataSource implements DataSource<Application>{
  private todoSubject = new BehaviorSubject<Application[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private applicationService: ApplicationService) { }

  connect(collectionViewer: CollectionViewer): Observable<Application[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadApplication(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.applicationService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: ApplicationResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }


}
