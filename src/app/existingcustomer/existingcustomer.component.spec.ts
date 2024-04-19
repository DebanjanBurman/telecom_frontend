import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingcustomerComponent } from './existingcustomer.component';

describe('ExistingcustomerComponent', () => {
  let component: ExistingcustomerComponent;
  let fixture: ComponentFixture<ExistingcustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistingcustomerComponent]
    });
    fixture = TestBed.createComponent(ExistingcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
