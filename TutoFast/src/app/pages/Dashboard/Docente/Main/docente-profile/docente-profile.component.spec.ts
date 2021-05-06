import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteProfileComponent } from './docente-profile.component';

describe('DocenteProfileComponent', () => {
  let component: DocenteProfileComponent;
  let fixture: ComponentFixture<DocenteProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
