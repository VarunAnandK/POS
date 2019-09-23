import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreateOrUpdateComponent } from './companycreateorupdate.component';

describe('CompanycreateorupdateComponent', () => {
  let component: CompanyCreateOrUpdateComponent;
  let fixture: ComponentFixture<CompanyCreateOrUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCreateOrUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
