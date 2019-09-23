import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialinvoiceComponent } from './partialinvoice.component';

describe('PartialinvoiceComponent', () => {
  let component: PartialinvoiceComponent;
  let fixture: ComponentFixture<PartialinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
