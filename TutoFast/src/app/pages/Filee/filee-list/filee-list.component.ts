import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FileeDataSource} from "../../../models/Filee/filee-data-source";
import {FileeService} from "../../../services/filee.service";
import {Filee} from "../../../models/Filee/filee";
@Component({
  selector: 'app-file-list',
  templateUrl: './filee-list.component.html',
  styleUrls: ['./filee-list.component.css']
})
export class FileeListComponent implements OnInit {

  @ViewChild('fileForm', {static: false})
  fileForm: NgForm;

  fileData: Filee;

  dataSource = new MatTableDataSource();

  displayedColumns = [ 'id','fileName','fileType','size','content','actions'];
  fileDataSource: FileeDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  isEditMode = false;

  //
  fileToUpload: File = null;
  //

  constructor(private fileService: FileeService) {
    this.fileData = {} as Filee;
  }

  ngOnInit(): void {
    this.LoadFiles();
  }
  //Mod
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  //
  convertToUrl(content: Blob){
    return  window.URL.createObjectURL(content)
  }

  // tslint:disable-next-line:typedef
  LoadFiles() {
    this.fileDataSource = new FileeDataSource(this.fileService);
    this.fileDataSource.loadFiles();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.fileData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.fileForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.fileService.deleteItem(id).subscribe((response: any) => {
      this.LoadFiles();
      this.dataSource.data = this.dataSource.data.filter((o: Filee) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  downloadItem() {
    this.fileService.downloadItem(this.fileData.id);
    //console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddFiles() {
    this.fileService.createItem(this.fileData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadFiles();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }
/*
  // tslint:disable-next-line:typedef
  UpdateFile() {
    this.fileService.updateItem(this.fileData.id, this.fileData)
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
*/
  // tslint:disable-next-line:typedef

  onSubmit() {
    if (this.fileForm.form.valid) {
      if (this.isEditMode) {
        //this.UpdateEconomicLevel();
      }
      else {
        this.AddFiles();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }

}
