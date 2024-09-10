import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDecoratorComponent } from './menu-decorator.component';

describe('MenuDecoratorComponent', () => {
  let component: MenuDecoratorComponent;
  let fixture: ComponentFixture<MenuDecoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDecoratorComponent]
    });
    fixture = TestBed.createComponent(MenuDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
