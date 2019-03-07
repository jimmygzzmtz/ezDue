import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceModalPage } from './finance-modal.page';

describe('FinanceModalPage', () => {
  let component: FinanceModalPage;
  let fixture: ComponentFixture<FinanceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
