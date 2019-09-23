import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcreateorupdateComponent } from './productcreateorupdate.component';

describe('ProductcreateorupdateComponent', () => {
  let component: ProductcreateorupdateComponent;
  let fixture: ComponentFixture<ProductcreateorupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcreateorupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcreateorupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
