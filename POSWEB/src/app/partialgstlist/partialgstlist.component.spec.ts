import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialgstlistComponent } from './partialgstlist.component';

describe('PartialgstlistComponent', () => {
  let component: PartialgstlistComponent;
  let fixture: ComponentFixture<PartialgstlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialgstlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialgstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
