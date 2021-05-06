import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {AccountDataSource} from '../../../models/Account/account-data-source';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  displayedColumns = ['id', 'username', 'password'];
  Account: AccountDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.Account = new AccountDataSource(this.accountService);
    this.Account.loadAccounts();
  }

  loadTodos() {
    this.Account.loadAccounts(this.paginator.pageIndex, this.paginator.pageSize);
  }

}
