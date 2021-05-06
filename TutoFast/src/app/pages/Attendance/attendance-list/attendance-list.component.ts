import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {AttendanceDataSource} from '../../../models/Attendance/attendance-data-source';
import {AttendanceService} from '../../../services/attendance.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Attendance} from '../../../models/Attendance/attendance';
import * as _ from 'lodash';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  @ViewChild('attendanceForm', {static: false})
  attendanceForm: NgForm;

  AttendanceData: Attendance;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'firstConfirmation', 'secondConfirmation', 'session'];
  Attendance: AttendanceDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private attendanceService: AttendanceService) {
    this.AttendanceData = {} as Attendance;
  }

  ngOnInit(): void {
    this.LoadAttendances();
  }

  // tslint:disable-next-line:typedef
  LoadAttendances() {
    this.Attendance = new AttendanceDataSource(this.attendanceService);
    this.Attendance.loadAttendances();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.AttendanceData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.attendanceForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.attendanceService.deleteItem(id).subscribe((response: any) => {
      this.LoadAttendances();
      this.dataSource.data = this.dataSource.data.filter((o: Attendance) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddAttendance() {
    this.attendanceService.createItem(this.AttendanceData.session,this.AttendanceData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadAttendances();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateAttendance() {
    this.attendanceService.updateItem(this.AttendanceData.session, this.AttendanceData.id,this.AttendanceData )
      .subscribe((response: any) => {
        this.LoadAttendances();
        this.dataSource.data = this.dataSource.data.map((o: Attendance) => {
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
    if (this.attendanceForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateAttendance();
      }
      else {
        this.AddAttendance();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
