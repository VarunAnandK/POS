import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialaddproductComponent } from './partialaddproduct.component';

describe('PartialaddproductComponent', () => {
  let component: PartialaddproductComponent;
  let fixture: ComponentFixture<PartialaddproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialaddproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialaddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
