import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {StudentDataSource} from '../../../models/Student/student-data-source';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Student} from '../../../models/Student/student';
import * as _ from 'lodash';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm: NgForm;

  StudentData: Student;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'username', 'password', 'name', 'lastname', 'dni', 'birthday', 'email', 'phone', 'adress', 'age', 'schoolLevel', 'schoolGrade', 'photo', 'category', 'district', 'actions'];
  Student: StudentDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private studentService: StudentService) {
    this.StudentData = {} as Student;
  }

  ngOnInit(): void {
    this.LoadStudents();
  }

  // tslint:disable-next-line:typedef
  LoadStudents() {
    this.Student = new StudentDataSource(this.studentService);
    this.Student.loadStudents();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.StudentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.studentService.deleteItem(id).subscribe((response: any) => {
      this.LoadStudents();
      this.dataSource.data = this.dataSource.data.filter((o: Student) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddStudent() {
    this.studentService.createItem(this.StudentData.district, this.StudentData.photo, this.StudentData.schoolLevel,
                                    this.StudentData.schoolGrade, this.StudentData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadStudents();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateStudent() {
    this.studentService.updateItem(this.StudentData.district, this.StudentData.schoolLevel, this.StudentData.schoolGrade, this.StudentData.id, this.StudentData)
      .subscribe((response: any) => {
        this.LoadStudents();
        this.dataSource.data = this.dataSource.data.map((o: Student) => {
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
    if (this.studentForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateStudent();
      }
      else {
        this.AddStudent();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
