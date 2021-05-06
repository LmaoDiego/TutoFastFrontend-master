import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { SchoolLevelListComponent } from './pages/SchoolLevel/school-level-list/school-level-list.component';
import { SchoolGradeListComponent } from './pages/SchoolGrade/school-grade-list/school-grade-list.component';
import { CategoryListComponent } from './pages/Category/category-list/category-list.component';
import { AccountListComponent } from './pages/Account/account-list/account-list.component';
import { UserListComponent } from './pages/User/user-list/user-list.component';
import { CourseListComponent } from './pages/Course/course-list/course-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EconomicLevelListComponent } from './pages/EconomicLevel/economic-level-list/economic-level-list.component';
import { ParentListComponent } from './pages/Parent/parent-list/parent-list.component';
import { StudentListComponent } from './pages/Student/student-list/student-list.component';
import { SubjectListComponent } from './pages/Subject/subject-list/subject-list.component';
import { OutcomeReportListComponent } from './pages/OutcomeReport/outcome-report-list/outcome-report-list.component';
import { StudentGoalListComponent } from './pages/StudentGoal/student-goal-list/student-goal-list.component';
import {SessionListComponent} from "./pages/Session/session-list/session-list.component";
import {ReviewListComponent} from "./pages/Review/review-list/review-list.component";
import { ApplicationListComponent } from './pages/Application/application-list/application-list.component';
import { FileeListComponent } from './pages/Filee/filee-list/filee-list.component';

import {TeacherListComponent} from "./pages/Teacher/teacher-list/teacher-list.component";
import {DistrictListComponent} from "./pages/District/district-list/district-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AttendanceListComponent} from "./pages/Attendance/attendance-list/attendance-list.component";
import { DocenteMainComponent } from './pages/Dashboard/Docente/Main/docente-main/docente-main.component';
import { DocenteProfileComponent } from './pages/Dashboard/Docente/Main/docente-profile/docente-profile.component';
import { DocenteEditProfileComponent } from './pages/Dashboard/Docente/Main/docente-edit-profile/docente-edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    EconomicLevelListComponent,
    DistrictListComponent,
    SchoolLevelListComponent,
    SchoolGradeListComponent,
    CategoryListComponent,
    AccountListComponent,
    UserListComponent,
    CourseListComponent,
TeacherListComponent,
    ParentListComponent,
    StudentListComponent,
    SubjectListComponent,
    OutcomeReportListComponent,
    StudentGoalListComponent,
    ReviewListComponent,
    SessionListComponent,
    ApplicationListComponent,
    FileeListComponent,
    SessionListComponent,
    AttendanceListComponent,
    DocenteMainComponent,
    DocenteProfileComponent,
    DocenteEditProfileComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
