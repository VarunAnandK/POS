import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTCategoryComponent } from './gstcategory.component';

describe('GSTCategoryComponent', () => {
  let component: GSTCategoryComponent;
  let fixture: ComponentFixture<GSTCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
