import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTComponent } from './gst.component';

describe('GSTComponent', () => {
  let component: GSTComponent;
  let fixture: ComponentFixture<GSTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
