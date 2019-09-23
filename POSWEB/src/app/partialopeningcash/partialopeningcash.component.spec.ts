import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialopeningcashComponent } from './partialopeningcash.component';

describe('PartialopeningcashComponent', () => {
  let component: PartialopeningcashComponent;
  let fixture: ComponentFixture<PartialopeningcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialopeningcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialopeningcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
