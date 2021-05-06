import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {CategoryDataSource} from '../../../models/Category/category-data-source';
import {CategoryService} from '../../../services/category.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../../../models/Category/category';
import * as _ from 'lodash';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @ViewChild('categoryForm', {static: false})
  categoryForm: NgForm;

  CategoryData: Category;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'actions'];
  Category: CategoryDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private categoryService: CategoryService) {
    this.CategoryData = {} as Category;
  }

  ngOnInit(): void {
    this.LoadCategories();
  }

  // tslint:disable-next-line:typedef
  LoadCategories() {
    this.Category = new CategoryDataSource(this.categoryService);
    this.Category.loadCategories();
    // this.EconomicLevel.loadEconomics(this.paginator.pageIndex, this.paginator.pageSize);
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.CategoryData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.categoryForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.categoryService.deleteItem(id).subscribe((response: any) => {
      this.LoadCategories();
      this.dataSource.data = this.dataSource.data.filter((o: Category) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddCategory() {
    this.categoryService.createItem(this.CategoryData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadCategories();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateCategory() {
    this.categoryService.updateItem(this.CategoryData.id, this.CategoryData)
      .subscribe((response: any) => {
        this.LoadCategories();
        this.dataSource.data = this.dataSource.data.map((o: Category) => {
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
    if (this.categoryForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateCategory();
      }
      else {
        this.AddCategory();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
