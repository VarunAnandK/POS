import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTCreateOrUpdateComponent } from './gstcreate-or-update.component';

describe('GSTCreateOrUpdateComponent', () => {
  let component: GSTCreateOrUpdateComponent;
  let fixture: ComponentFixture<GSTCreateOrUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTCreateOrUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
