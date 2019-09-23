import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGroupComponent } from './businessgroup.component';

describe('BusinessGroupComponent', () => {
  let component: BusinessGroupComponent;
  let fixture: ComponentFixture<BusinessGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
