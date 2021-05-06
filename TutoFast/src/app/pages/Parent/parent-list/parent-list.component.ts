import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ParentDataSource} from '../../../models/Parent/parent-data-source';
import {ParentService} from '../../../services/parent.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Parent} from '../../../models/Parent/parent';
import * as _ from 'lodash';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {

  @ViewChild('parentForm', {static: false})
  parentForm: NgForm;

  ParentData: Parent;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'username', 'password', 'name', 'lastname', 'dni', 'birthday', 'email', 'phone', 'adress', 'availableHours', 'photo' , 'category', 'district', 'actions'];
  Parent: ParentDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private parentService: ParentService) {
    this.ParentData = {} as Parent;
  }

  ngOnInit(): void {
    this.LoadParents();
  }

  // tslint:disable-next-line:typedef
  LoadParents() {
    this.Parent = new ParentDataSource(this.parentService);
    this.Parent.loadParents();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.ParentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.parentForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.parentService.deleteItem(id).subscribe((response: any) => {
      this.LoadParents();
      this.dataSource.data = this.dataSource.data.filter((o: Parent) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddParent() {
    this.parentService.createItem(this.ParentData.district, this.ParentData.photo, this.ParentData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadParents();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateParent() {
    this.parentService.updateItem(this.ParentData.district, this.ParentData.id, this.ParentData)
      .subscribe((response: any) => {
        this.LoadParents();
        this.dataSource.data = this.dataSource.data.map((o: Parent) => {
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
    if (this.parentForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateParent();
      }
      else {
        this.AddParent();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
