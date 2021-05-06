import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {CourseDataSource} from '../../../models/Course/course-data-source';
import {CourseService} from '../../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'tiempo'];
  Course: CourseDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.Course = new CourseDataSource(this.courseService);
    this.Course.loadCourses();
  }

  // loadTodos() {
  //   this.Course.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
  // }

}
