import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialholdlistComponent } from './partialholdlist.component';

describe('PartialholdlistComponent', () => {
  let component: PartialholdlistComponent;
  let fixture: ComponentFixture<PartialholdlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialholdlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialholdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
