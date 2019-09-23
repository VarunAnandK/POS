import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreateOrUpdateComponent } from './businesscreateorupdate.component';

describe('BusinesscreateorupdateComponent', () => {
  let component: BusinessCreateOrUpdateComponent;
  let fixture: ComponentFixture<BusinessCreateOrUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCreateOrUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
