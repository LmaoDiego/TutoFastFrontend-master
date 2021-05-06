import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Session, SessionResponse} from './session';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {catchError, finalize} from 'rxjs/operators';

export class SessionDataSource implements DataSource<Session>{
  private todoSubject = new BehaviorSubject<Session[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private sessionService: SessionService) { }

  connect(collectionViewer: CollectionViewer): Observable<Session[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadSessions(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.sessionService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: SessionResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
