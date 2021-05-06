import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {StudentDataSource} from '../../../../../models/Student/student-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {Student} from '../../../../../models/Student/student';
import {StudentService} from '../../../../../services/student.service';

@Component({
  selector: 'app-docente-main',
  templateUrl: './docente-main.component.html',
  styleUrls: ['./docente-main.component.css']
})
export class DocenteMainComponent implements OnInit {

  displayedColumns = ['id', 'student', 'schoolLevel', 'schoolGrade', 'photo', 'district'];
  Student: StudentDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.LoadStudents();
  }

  // tslint:disable-next-line:typedef
  LoadStudents() {
    this.Student = new StudentDataSource(this.studentService);
    this.Student.loadStudents();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
