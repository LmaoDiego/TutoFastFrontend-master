import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {StudentGoalDataSource} from '../../../models/StudentGoal/student-goal-data-source';
import {StudentGoalService} from '../../../services/student-goal.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {StudentGoal} from '../../../models/StudentGoal/student-goal';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-goal-list',
  templateUrl: './student-goal-list.component.html',
  styleUrls: ['./student-goal-list.component.css']
})
export class StudentGoalListComponent implements OnInit {

  @ViewChild('studentGoalForm', {static: false})
  studentGoalForm: NgForm;

  StudentGoalData: StudentGoal;

  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'statement', 'evaluation','outcomeReport','subject','session', 'actions'];
  StudentGoal: StudentGoalDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;

  constructor(private studentGoalService: StudentGoalService) {
    this.StudentGoalData = {} as StudentGoal;
  }

  ngOnInit(): void {
    this.LoadStudentGoals();
  }

  // tslint:disable-next-line:typedef
  LoadStudentGoals() {
    this.StudentGoal = new StudentGoalDataSource(this.studentGoalService);
    this.StudentGoal.loadStudentGoals();
  }

  // tslint:disable-next-line:typedef
  editItem(element) {
    this.StudentGoalData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  // tslint:disable-next-line:typedef
  cancelEdit() {
    this.isEditMode = false;
    this.studentGoalForm.resetForm();
  }

  // tslint:disable-next-line:typedef
  deleteItem(id) {
    this.studentGoalService.deleteItem(id).subscribe((response: any) => {
      this.LoadStudentGoals();
      this.dataSource.data = this.dataSource.data.filter((o: StudentGoal) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  // tslint:disable-next-line:typedef
  AddStudentGoal() {
    this.studentGoalService.createItem(this.StudentGoalData.outcomeReport,this.StudentGoalData.subject,this.StudentGoalData.session, this.StudentGoalData).subscribe((response: any) => {
      this.LoadStudentGoals();
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  // tslint:disable-next-line:typedef
  UpdateStudentGoal() {
    this.studentGoalService.updateItem(this.StudentGoalData.id, this.StudentGoalData)
      .subscribe((response: any) => {
        this.LoadStudentGoals();
        this.dataSource.data = this.dataSource.data.map((o: StudentGoal) => {
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
    if (this.studentGoalForm.form.valid) {
      if (this.isEditMode) {
        this.UpdateStudentGoal();
      }
      else {
        this.AddStudentGoal();
      }
    }
    else {
      console.log('Invalid Data');
    }
  }
}
