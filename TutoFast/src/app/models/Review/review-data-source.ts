import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Review, ReviewResponse} from './review';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ReviewService} from '../../services/review.service';
import {catchError, finalize} from 'rxjs/operators';

export class ReviewDataSource implements DataSource<Review>{
  private todoSubject = new BehaviorSubject<Review[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private reviewService: ReviewService) { }

  connect(collectionViewer: CollectionViewer): Observable<Review[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadReviews(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.reviewService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: ReviewResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
