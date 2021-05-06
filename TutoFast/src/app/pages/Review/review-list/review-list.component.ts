import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ReviewDataSource} from '../../../models/Review/review-data-source';
import {ReviewService} from '../../../services/review.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Review} from '../../../models/Review/review';
import * as _ from 'lodash';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @ViewChild('reviewForm', {static: false})
  reviewForm: NgForm;

  ReviewData: Review;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'description', 'stars', 'parent','teacher','actions'];
  Review: ReviewDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private reviewService: ReviewService) {
    this.ReviewData = {} as Review;
  }

  ngOnInit(): void {
    this.LoadReviews();
  }

  // tslint:disable-next-line:typedef
  LoadReviews() {
    this.Review = new ReviewDataSource(this.reviewService);
    this.Review.loadReviews();
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.ReviewData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.reviewForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.reviewService.deleteItem(id).subscribe((response: any) => {
      this.LoadReviews();
      this.dataSource.data = this.dataSource.data.filter((o: Review) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddReview() {
    this.reviewService.createItem(this.ReviewData.parent,this.ReviewData.teacher,this.ReviewData).subscribe((response: any) => {
      // this.dataSource.data.push({ ...response });
      this.LoadReviews();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateReview() {
    this.reviewService.updateItem(this.ReviewData.id, this.ReviewData)
      .subscribe((response: any) => {
        this.LoadReviews();
        this.dataSource.data = this.dataSource.data.map((o: Review) => {
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
    if (this.reviewForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateReview();
      }
      else {
        this.AddReview();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
