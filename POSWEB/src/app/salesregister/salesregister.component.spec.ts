import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesregisterComponent } from './salesregister.component';

describe('SalesregisterComponent', () => {
  let component: SalesregisterComponent;
  let fixture: ComponentFixture<SalesregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
