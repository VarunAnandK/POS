import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialcashComponent } from './partialcash.component';

describe('PartialcashComponent', () => {
  let component: PartialcashComponent;
  let fixture: ComponentFixture<PartialcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
