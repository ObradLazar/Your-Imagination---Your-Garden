import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorBookingComponent } from './decorator-booking.component';

describe('DecoratorBookingComponent', () => {
  let component: DecoratorBookingComponent;
  let fixture: ComponentFixture<DecoratorBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorBookingComponent]
    });
    fixture = TestBed.createComponent(DecoratorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
