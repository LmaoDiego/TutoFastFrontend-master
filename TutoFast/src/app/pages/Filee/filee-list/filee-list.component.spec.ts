import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileeListComponent } from './filee-list.component';

describe('FileListComponent', () => {
  let component: FileeListComponent;
  let fixture: ComponentFixture<FileeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
