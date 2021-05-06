import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {EconomicLevel, EconomicLevelResponse} from './economic-level';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EconomicLevelService} from '../../services/economic-level.service';
import {catchError, finalize} from 'rxjs/operators';

export class EconomicLevelDataSource implements DataSource<EconomicLevel>{
  private todoSubject = new BehaviorSubject<EconomicLevel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private economicLevelService: EconomicLevelService) { }

  connect(collectionViewer: CollectionViewer): Observable<EconomicLevel[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadEconomics(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.economicLevelService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: EconomicLevelResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
