import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesregisterdetailComponent } from './salesregisterdetail.component';

describe('SalesregisterdetailComponent', () => {
  let component: SalesregisterdetailComponent;
  let fixture: ComponentFixture<SalesregisterdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesregisterdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesregisterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
