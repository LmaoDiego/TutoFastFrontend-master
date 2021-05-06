import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicLevelListComponent } from './economic-level-list.component';

describe('EconomicLevelListComponent', () => {
  let component: EconomicLevelListComponent;
  let fixture: ComponentFixture<EconomicLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
