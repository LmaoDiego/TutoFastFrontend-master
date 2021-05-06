import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Subject} from '../../../models/Subject/subject';
import {SubjectDataSource} from '../../../models/Subject/subject-data-source';
import {SubjectService} from '../../../services/subject.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  @ViewChild('subjectForm', {static: false})
  subjectForm: NgForm;

  SubjectData: Subject;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'actions'];
  Subject: SubjectDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private subjectServices: SubjectService) {
    this.SubjectData = {} as Subject;
  }

  ngOnInit(): void {
    this.LoadSubjects();
  }

  // tslint:disable-next-line:typedef
  LoadSubjects() {
    this.Subject = new SubjectDataSource(this.subjectServices);
    this.Subject.loadSubjects();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.SubjectData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.subjectForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.subjectServices.deleteItem(id).subscribe((response: any) => {
      this.LoadSubjects();
      this.dataSource.data = this.dataSource.data.filter((o: Subject) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddSubject() {
    this.subjectServices.createItem(this.SubjectData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadSubjects();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateSubject() {
    this.subjectServices.updateItem(this.SubjectData.id, this.SubjectData)
      .subscribe((response: any) => {
        this.LoadSubjects();
        this.dataSource.data = this.dataSource.data.map((o: Subject) => {
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
    if (this.subjectForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateSubject();
      }
      else {
        this.AddSubject();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
