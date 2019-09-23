import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialdiscountComponent } from './partialdiscount.component';

describe('PartialdiscountComponent', () => {
  let component: PartialdiscountComponent;
  let fixture: ComponentFixture<PartialdiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialdiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
