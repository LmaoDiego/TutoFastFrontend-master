import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {DistrictDataSource} from '../../../models/District/district-data-source';
import {DistrictService} from '../../../services/district.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {District} from '../../../models/District/district';
import * as _ from 'lodash';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {

  @ViewChild('districtForm', {static: false})
  districtForm: NgForm;

  DistrictData: District;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'economicLevel', 'actions'];
  District: DistrictDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private districtService: DistrictService) {
    this.DistrictData = {} as District;
  }

  ngOnInit(): void {
    this.LoadDistricts();
  }

  // tslint:disable-next-line:typedef
  LoadDistricts() {
    this.District = new DistrictDataSource(this.districtService);
    this.District.loadDistricts();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.DistrictData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.districtForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.districtService.deleteItem(id).subscribe((response: any) => {
      this.LoadDistricts();
      this.dataSource.data = this.dataSource.data.filter((o: District) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddDistrict() {
    this.districtService.createItem(this.DistrictData.economicLevel, this.DistrictData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadDistricts();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateDistrict() {
    this.districtService.updateItem(this.DistrictData.id, this.DistrictData)
      .subscribe((response: any) => {
        this.LoadDistricts();
        this.dataSource.data = this.dataSource.data.map((o: District) => {
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
    if (this.districtForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateDistrict();
      }
      else {
        this.AddDistrict();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
