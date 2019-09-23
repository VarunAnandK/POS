import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialGSTDetailComponent } from './partial-gstdetail.component';

describe('PartialGSTDetailComponent', () => {
  let component: PartialGSTDetailComponent;
  let fixture: ComponentFixture<PartialGSTDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialGSTDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialGSTDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
