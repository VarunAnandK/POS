import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybooksummaryComponent } from './daybooksummary.component';

describe('DaybooksummaryComponent', () => {
  let component: DaybooksummaryComponent;
  let fixture: ComponentFixture<DaybooksummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaybooksummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaybooksummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
