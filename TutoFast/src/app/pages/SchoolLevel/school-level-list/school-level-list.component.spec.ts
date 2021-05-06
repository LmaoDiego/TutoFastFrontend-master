import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLevelListComponent } from './school-level-list.component';

describe('SchoolLevelListComponent', () => {
  let component: SchoolLevelListComponent;
  let fixture: ComponentFixture<SchoolLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
