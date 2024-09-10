import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorGraphsComponent } from './decorator-graphs.component';

describe('DecoratorGraphsComponent', () => {
  let component: DecoratorGraphsComponent;
  let fixture: ComponentFixture<DecoratorGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorGraphsComponent]
    });
    fixture = TestBed.createComponent(DecoratorGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
