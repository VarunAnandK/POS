import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosNavbarComponent } from './pos-navbar.component';

describe('PosNavbarComponent', () => {
  let component: PosNavbarComponent;
  let fixture: ComponentFixture<PosNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
