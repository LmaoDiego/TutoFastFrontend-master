import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EconomicLevelListComponent } from './pages/EconomicLevel/economic-level-list/economic-level-list.component';
import { DistrictListComponent } from './pages/District/district-list/district-list.component';
import { SchoolLevelListComponent } from './pages/SchoolLevel/school-level-list/school-level-list.component';
import { SchoolGradeListComponent } from './pages/SchoolGrade/school-grade-list/school-grade-list.component';

import { CategoryListComponent } from './pages/Category/category-list/category-list.component';
import { TeacherListComponent } from './pages/Teacher/teacher-list/teacher-list.component';
import { ParentListComponent } from './pages/Parent/parent-list/parent-list.component';
import { AccountListComponent } from './pages/Account/account-list/account-list.component';
import { UserListComponent } from './pages/User/user-list/user-list.component';
import { CourseListComponent } from './pages/Course/course-list/course-list.component';
import {StudentListComponent} from './pages/Student/student-list/student-list.component';

import {SubjectListComponent} from './pages/Subject/subject-list/subject-list.component';

import {OutcomeReportListComponent} from './pages/OutcomeReport/outcome-report-list/outcome-report-list.component';
import {SessionListComponent} from './pages/Session/session-list/session-list.component';
import {ReviewListComponent} from './pages/Review/review-list/review-list.component';
import {StudentGoalListComponent} from './pages/StudentGoal/student-goal-list/student-goal-list.component';
import {ApplicationListComponent} from './pages/Application/application-list/application-list.component';
import {FileeListComponent} from './pages/Filee/filee-list/filee-list.component';

import {AttendanceListComponent} from './pages/Attendance/attendance-list/attendance-list.component';
import {DocenteMainComponent} from './pages/Dashboard/Docente/Main/docente-main/docente-main.component';
import {DocenteEditProfileComponent} from './pages/Dashboard/Docente/Main/docente-edit-profile/docente-edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/docenteMain', pathMatch: 'full' },

  { path : 'docenteMain', component: DocenteMainComponent },
  { path : 'docenteEditProfile', component: DocenteEditProfileComponent },

  { path : 'economicLevel', component: EconomicLevelListComponent },
  { path : 'district', component: DistrictListComponent },
  { path : 'schoolLevel', component: SchoolLevelListComponent },
  { path : 'schoolGrade', component: SchoolGradeListComponent },

  { path : 'files', component: FileeListComponent },

  { path : 'category', component: CategoryListComponent },
  { path : 'account', component: AccountListComponent },
  { path : 'user', component: UserListComponent },
  { path : 'course', component: CourseListComponent },
  { path : 'student', component: StudentListComponent },
  { path : 'teacher', component: TeacherListComponent },
  { path : 'parent', component: ParentListComponent },

  { path : 'subject', component: SubjectListComponent },

  { path : 'outcomeReport', component: OutcomeReportListComponent },
  { path : 'studentGoal', component: StudentGoalListComponent },
  { path : 'review', component: ReviewListComponent },

  { path : 'session', component: SessionListComponent },
  { path : 'application', component: ApplicationListComponent },

  { path : 'attendance', component: AttendanceListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export  class AppRoutingModule { }
