import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialaddcustomerComponent } from './partialaddcustomer.component';

describe('PartialaddcustomerComponent', () => {
  let component: PartialaddcustomerComponent;
  let fixture: ComponentFixture<PartialaddcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialaddcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialaddcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
