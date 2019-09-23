import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailsummaryComponent } from './productdetailsummary.component';

describe('ProductdetailsummaryComponent', () => {
  let component: ProductdetailsummaryComponent;
  let fixture: ComponentFixture<ProductdetailsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdetailsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdetailsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
