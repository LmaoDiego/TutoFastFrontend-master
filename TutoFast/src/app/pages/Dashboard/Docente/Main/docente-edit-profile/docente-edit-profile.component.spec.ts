import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteEditProfileComponent } from './docente-edit-profile.component';

describe('DocenteEditProfileComponent', () => {
  let component: DocenteEditProfileComponent;
  let fixture: ComponentFixture<DocenteEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
