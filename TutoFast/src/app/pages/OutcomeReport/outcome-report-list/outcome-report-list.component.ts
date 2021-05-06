import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {OutcomeReportDataSource} from '../../../models/OutcomeReport/outcome-report-data-source';
import {OutcomeReportService} from '../../../services/outcome-report.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {OutcomeReport} from '../../../models/OutcomeReport/outcome-report';

import * as _ from 'lodash';

@Component({
  selector: 'app-outcome-report-list',
  templateUrl: './outcome-report-list.component.html',
  styleUrls: ['./outcome-report-list.component.css']
})
export class OutcomeReportListComponent implements OnInit {

  @ViewChild('outcomeReportForm', {static: false})
  outcomeReportForm: NgForm;

  OutcomeReportData: OutcomeReport;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'student','teacher','actions'];
  OutcomeReport: OutcomeReportDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private outcomeReportService: OutcomeReportService) {
    this.OutcomeReportData = {} as OutcomeReport;
  }

  ngOnInit(): void {
    this.LoadOutcomeReports();
  }

  // tslint:disable-next-line:typedef
  LoadOutcomeReports() {
    this.OutcomeReport = new OutcomeReportDataSource(this.outcomeReportService);
    this.OutcomeReport.loadOutcomeReports();

  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.OutcomeReportData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.outcomeReportForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.outcomeReportService.deleteItem(id).subscribe((response: any) => {
      this.LoadOutcomeReports();
      this.dataSource.data = this.dataSource.data.filter((o: OutcomeReport) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddOutcomeReport() {
    this.outcomeReportService.createItem(this.OutcomeReportData.student, this.OutcomeReportData.teacher, this.OutcomeReportData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadOutcomeReports();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.outcomeReportForm.form.valid) {
      this.AddOutcomeReport();
    }
    else {
      console.log('Invalid Data');
    }
  }
}
