import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Account, AccountResponse} from './account';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CategoryService} from '../../services/category.service';
import {AccountService} from '../../services/account.service';
import {catchError, finalize} from 'rxjs/operators';
import {CategoryResponse} from '../Category/category';

export class AccountDataSource implements DataSource<Account>{
  private todoSubject = new BehaviorSubject<Account[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private accountService: AccountService) { }

  connect(collectionViewer: CollectionViewer): Observable<Account[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadAccounts(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.accountService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: AccountResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
