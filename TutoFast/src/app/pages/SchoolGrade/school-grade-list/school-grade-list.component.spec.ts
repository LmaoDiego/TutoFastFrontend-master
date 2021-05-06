import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGradeListComponent } from './school-grade-list.component';

describe('SchoolGradeListComponent', () => {
  let component: SchoolGradeListComponent;
  let fixture: ComponentFixture<SchoolGradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGradeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
