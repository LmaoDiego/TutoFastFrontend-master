import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {TeacherDataSource} from '../../../models/Teacher/teacher-data-source';
import {TeacherService} from '../../../services/teacher.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Teacher} from '../../../models/Teacher/teacher';
import * as _ from 'lodash';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  @ViewChild('teacherForm', {static: false})
  teacherForm: NgForm;

  TeacherData: Teacher;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'username', 'password', 'name', 'lastname', 'dni', 'birthday', 'email', 'phone', 'adress', 'clientXP', 'sessionXP', 'active', 'photo', 'category', 'district', 'actions'];
  Teacher: TeacherDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private teacherService: TeacherService) {
    this.TeacherData = {} as Teacher;
  }

  ngOnInit(): void {
    this.LoadTeachers();
  }

  // tslint:disable-next-line:typedef
  LoadTeachers() {
    this.Teacher = new TeacherDataSource(this.teacherService);
    this.Teacher.loadTeachers();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.TeacherData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.teacherForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.teacherService.deleteItem(id).subscribe((response: any) => {
      this.LoadTeachers();
      this.dataSource.data = this.dataSource.data.filter((o: Teacher) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddTeacher() {
    this.teacherService.createItem(this.TeacherData.district, this.TeacherData.photo,
                                    this.TeacherData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadTeachers();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateTeacher() {
    this.teacherService.updateItem(this.TeacherData.district, this.TeacherData.id, this.TeacherData)
      .subscribe((response: any) => {
        this.LoadTeachers();
        this.dataSource.data = this.dataSource.data.map((o: Teacher) => {
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
    if (this.teacherForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateTeacher();
      }
      else {
        this.AddTeacher();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
