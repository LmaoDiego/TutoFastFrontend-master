import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {SchoolGradeDataSource} from '../../../models/SchoolGrade/school-grade-data-source';
import {SchoolGradeService} from '../../../services/school-grade.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SchoolGrade} from '../../../models/SchoolGrade/school-grade';
import * as _ from 'lodash';

@Component({
  selector: 'app-school-grade-list',
  templateUrl: './school-grade-list.component.html',
  styleUrls: ['./school-grade-list.component.css']
})
export class SchoolGradeListComponent implements OnInit {

  @ViewChild('schoolGradeForm', {static: false})
  schoolGradeForm: NgForm;

  SchoolGradeData: SchoolGrade;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'actions'];
  SchoolGrade: SchoolGradeDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private schoolGradeService: SchoolGradeService) {
    this.SchoolGradeData = {} as SchoolGrade;
  }

  ngOnInit(): void {
    this.LoadSchoolGrades();
  }

  // tslint:disable-next-line:typedef
  LoadSchoolGrades() {
    this.SchoolGrade = new SchoolGradeDataSource(this.schoolGradeService);
    this.SchoolGrade.loadGrades();
    this.SchoolGrade.loadGrades(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.SchoolGradeData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.schoolGradeForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.schoolGradeService.deleteItem(id).subscribe((response: any) => {
      this.LoadSchoolGrades();
      this.dataSource.data = this.dataSource.data.filter((o: SchoolGrade) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddSchoolGrade() {
    this.schoolGradeService.createItem(this.SchoolGradeData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadSchoolGrades();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateSchoolGrade() {
    this.schoolGradeService.updateItem(this.SchoolGradeData.id, this.SchoolGradeData)
      .subscribe((response: any) => {
        this.LoadSchoolGrades();
        this.dataSource.data = this.dataSource.data.map((o: SchoolGrade) => {
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
    if (this.schoolGradeForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateSchoolGrade();
      }
      else {
        this.AddSchoolGrade();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
