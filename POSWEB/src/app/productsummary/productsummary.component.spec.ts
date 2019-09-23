import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsummaryComponent } from './productsummary.component';

describe('ProductsummaryComponent', () => {
  let component: ProductsummaryComponent;
  let fixture: ComponentFixture<ProductsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
