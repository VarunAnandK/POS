import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialroundoffComponent } from './partialroundoff.component';

describe('PartialroundoffComponent', () => {
  let component: PartialroundoffComponent;
  let fixture: ComponentFixture<PartialroundoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialroundoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialroundoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
