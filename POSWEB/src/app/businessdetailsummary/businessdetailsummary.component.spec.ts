import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessdetailsummaryComponent } from './businessdetailsummary.component';

describe('BusinessdetailsummaryComponent', () => {
  let component: BusinessdetailsummaryComponent;
  let fixture: ComponentFixture<BusinessdetailsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessdetailsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessdetailsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
