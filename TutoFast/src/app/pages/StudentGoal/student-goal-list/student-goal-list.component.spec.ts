import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGoalListComponent } from './student-goal-list.component';

describe('StudentGoalListComponent', () => {
  let component: StudentGoalListComponent;
  let fixture: ComponentFixture<StudentGoalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGoalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
