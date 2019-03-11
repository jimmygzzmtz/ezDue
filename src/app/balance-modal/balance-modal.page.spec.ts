import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceModalPage } from './balance-modal.page';

describe('BalanceModalPage', () => {
  let component: BalanceModalPage;
  let fixture: ComponentFixture<BalanceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
