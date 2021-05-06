import {Component, OnInit, ViewChild} from '@angular/core';
import {EconomicLevelDataSource} from '../../../models/EconomicLevel/economic-level-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {EconomicLevelService} from '../../../services/economic-level.service';
import {NgForm} from '@angular/forms';
import {EconomicLevel} from '../../../models/EconomicLevel/economic-level';
import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-economic-level-list',
  templateUrl: './economic-level-list.component.html',
  styleUrls: ['./economic-level-list.component.css']
})
export class EconomicLevelListComponent implements OnInit {

  @ViewChild('economicLevelForm', {static: false})
  economicLevelForm: NgForm;

  EconomicData: EconomicLevel;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'actions'];
  EconomicLevel: EconomicLevelDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private economicLevelService: EconomicLevelService) {
    this.EconomicData = {} as EconomicLevel;
  }

  ngOnInit(): void {
    this.LoadEconomicLevels();
  }

  // tslint:disable-next-line:typedef
  LoadEconomicLevels() {
    this.EconomicLevel = new EconomicLevelDataSource(this.economicLevelService);
    this.EconomicLevel.loadEconomics();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.EconomicData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.economicLevelForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.economicLevelService.deleteItem(id).subscribe((response: any) => {
      this.LoadEconomicLevels();
      this.dataSource.data = this.dataSource.data.filter((o: EconomicLevel) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddEconomicLevel() {
    this.economicLevelService.createItem(this.EconomicData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadEconomicLevels();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateEconomicLevel() {
    this.economicLevelService.updateItem(this.EconomicData.id, this.EconomicData)
      .subscribe((response: any) => {
        this.LoadEconomicLevels();
        this.dataSource.data = this.dataSource.data.map((o: EconomicLevel) => {
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
    if (this.economicLevelForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateEconomicLevel();
      }
      else {
        this.AddEconomicLevel();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
