import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDashoardComponent } from './pos-dashoard.component';

describe('PosDashoardComponent', () => {
  let component: PosDashoardComponent;
  let fixture: ComponentFixture<PosDashoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosDashoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
