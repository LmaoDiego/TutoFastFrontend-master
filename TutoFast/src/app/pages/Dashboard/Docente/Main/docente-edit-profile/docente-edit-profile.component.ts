import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Student} from '../../../../../models/Student/student';
import {StudentService} from '../../../../../services/student.service';

@Component({
  selector: 'app-docente-edit-profile',
  templateUrl: './docente-edit-profile.component.html',
  styleUrls: ['./docente-edit-profile.component.css']
})
export class DocenteEditProfileComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm: NgForm;

  StudentData: Student;

  dataSource = new MatTableDataSource();

  constructor(private studentService: StudentService) {
    this.StudentData = {} as Student;
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  UpdateStudent() {
    this.studentService.updateItem(this.StudentData.district, 1, 1, 7, this.StudentData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Student) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
      });
  }

}
