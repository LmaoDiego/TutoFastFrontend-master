import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {User, UserResponse} from './user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserService} from '../../services/user.service';
import {catchError, finalize} from 'rxjs/operators';

export class UserDataSource implements DataSource<User>{
  private todoSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private userService: UserService) { }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.todoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadUsers(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.userService.getList({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: UserResponse) => {
          this.todoSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }
}
