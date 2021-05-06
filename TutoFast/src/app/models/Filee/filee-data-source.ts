import {BehaviorSubject, Observable, of} from "rxjs";
import {CollectionViewer} from "@angular/cdk/collections";
import {catchError, finalize} from "rxjs/operators";
import {Filee, FileResponse} from "./filee";
import {FileeService} from "../../services/filee.service";

export class FileeDataSource {
  private todoSubject = new BehaviorSubject<Filee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private fileService: FileeService) { }

  connect(collectionViewer: CollectionViewer): Observable<Filee[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadFiles(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.fileService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: FileResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
