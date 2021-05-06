import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {UserDataSource} from '../../../models/User/user-data-source';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['id', 'username', 'password', 'name', 'lastname', 'dni', 'birthday', 'email', 'phone', 'adress', 'category', 'district'];
  User: UserDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.User = new UserDataSource(this.userService);
    this.User.loadUsers();
  }

  loadTodos() {
    this.User.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
  }

}
