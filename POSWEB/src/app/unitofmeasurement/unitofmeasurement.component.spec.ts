import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementComponent } from './unitofmeasurement.component';

describe('UnitOfMeasurementComponent', () => {
  let component: UnitOfMeasurementComponent;
  let fixture: ComponentFixture<UnitOfMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
