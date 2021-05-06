import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {District, DistrictResponse} from './district';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DistrictService} from '../../services/district.service';
import {catchError, finalize} from 'rxjs/operators';

export class DistrictDataSource implements DataSource<District>{
  private todoSubject = new BehaviorSubject<District[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private districtService: DistrictService) { }

  connect(collectionViewer: CollectionViewer): Observable<District[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadDistricts(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.districtService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: DistrictResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
