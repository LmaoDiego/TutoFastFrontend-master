import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Application} from "../../../models/Application/application";
import {ApplicationService} from "../../../services/application.service";
import {ApplicationDataSource} from "../../../models/Application/application-data-source";
import * as _ from 'lodash';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  @ViewChild('applicationForm', {static: false})
  applicationForm: NgForm;

  applicationData: Application;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id','state', 'message','teacher','file','actions'];
  application: ApplicationDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  isEditMode = false;

  constructor(private applicationService: ApplicationService) {
    this.applicationData = {} as Application;
  }

  ngOnInit(): void {
    this.LoadApplications();
  }

  // tslint:disable-next-line:typedef
  LoadApplications() {
    this.application = new ApplicationDataSource(this.applicationService);
    this.application.loadApplication();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.applicationData = _.cloneDeep(element)
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.applicationForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.applicationService.deleteItem(id).subscribe((response: any) => {
      this.LoadApplications();
      this.dataSource.data = this.dataSource.data.filter((o: Application) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddApplication() {

    this.applicationService.createItem(1,this.applicationData.file.id, this.applicationData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadApplications();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateApplication() {
    //TODO: OJO AQUI
    this.applicationService.updateItem(this.applicationData.id, this.applicationData)
      .subscribe((response: any) => {
        this.LoadApplications()
        this.dataSource.data = this.dataSource.data.map((o: Application) => {
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
    if (this.applicationForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateApplication();
      }
      else {
        this.AddApplication();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a Filee() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a Filee() type
    return <File>theBlob;
  }

}
