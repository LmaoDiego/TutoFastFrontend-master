import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {SchoolLevelDataSource} from '../../../models/SchoolLevel/school-level-data-source';
import {SchoolLevelService} from '../../../services/school-level.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SchoolLevel} from '../../../models/SchoolLevel/school-level';
import * as _ from 'lodash';

@Component({
  selector: 'app-school-level-list',
  templateUrl: './school-level-list.component.html',
  styleUrls: ['./school-level-list.component.css']
})
export class SchoolLevelListComponent implements OnInit {

  @ViewChild('schoolLevelForm', {static: false})
  schoolLevelForm: NgForm;

  SchoolLevelData: SchoolLevel;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'actions'];
  SchoolLevel: SchoolLevelDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private schoolLevelService: SchoolLevelService) {
    this.SchoolLevelData = {} as SchoolLevel;
  }

  ngOnInit(): void {
    this.LoadSchoolLevels();
  }

  // tslint:disable-next-line:typedef
  LoadSchoolLevels() {
    this.SchoolLevel = new SchoolLevelDataSource(this.schoolLevelService);
    this.SchoolLevel.loadLevels();
    this.SchoolLevel.loadLevels(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.SchoolLevelData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.schoolLevelForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.schoolLevelService.deleteItem(id).subscribe((response: any) => {
      this.LoadSchoolLevels();
      this.dataSource.data = this.dataSource.data.filter((o: SchoolLevel) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddSchoolLevel() {
    this.schoolLevelService.createItem(this.SchoolLevelData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadSchoolLevels();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateSchoolLevel() {
    this.schoolLevelService.updateItem(this.SchoolLevelData.id, this.SchoolLevelData)
      .subscribe((response: any) => {
        this.LoadSchoolLevels();
        this.dataSource.data = this.dataSource.data.map((o: SchoolLevel) => {
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
    if (this.schoolLevelForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateSchoolLevel();
      }
      else {
        this.AddSchoolLevel();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
