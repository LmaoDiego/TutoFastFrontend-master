import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {SessionDataSource} from '../../../models/Session/session-data-source';
import {SessionService} from '../../../services/session.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Session} from '../../../models/Session/session';
import * as _ from 'lodash';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  @ViewChild('sessionForm', {static: false})
  sessionForm: NgForm;

  SessionData: Session;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'startAt', 'endAt', 'subject', 'student', 'teacher'];
  Session: SessionDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private sessionService: SessionService) {
    this.SessionData = {} as Session;
  }

  ngOnInit(): void {
    this.LoadSessions();
  }

  // tslint:disable-next-line:typedef
  LoadSessions() {
    this.Session = new SessionDataSource(this.sessionService);
    this.Session.loadSessions();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.SessionData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.sessionForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.sessionService.deleteItem(id).subscribe((response: any) => {
      this.LoadSessions();
      this.dataSource.data = this.dataSource.data.filter((o: Session) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddSession() {
    this.sessionService.createItem(this.SessionData.teacher, this.SessionData.student, this.SessionData.subject, this.SessionData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadSessions();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateSession() {
    this.sessionService.updateItem(this.SessionData.teacher, this.SessionData.student, this.SessionData.subject, this.SessionData.id,this.SessionData )
      .subscribe((response: any) => {
        this.LoadSessions();
        this.dataSource.data = this.dataSource.data.map((o: Session) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.sessionForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateSession();
      }
      else {
        this.AddSession();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
