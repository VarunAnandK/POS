import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesssummaryComponent } from './businesssummary.component';

describe('BusinesssummaryComponent', () => {
  let component: BusinesssummaryComponent;
  let fixture: ComponentFixture<BusinesssummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesssummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesssummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
