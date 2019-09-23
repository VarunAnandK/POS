import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialdaycloseComponent } from './partialdayclose.component';

describe('PartialdaycloseComponent', () => {
  let component: PartialdaycloseComponent;
  let fixture: ComponentFixture<PartialdaycloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialdaycloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialdaycloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
