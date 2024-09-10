import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAcceptDenyComponent } from './admin-user-accept-deny.component';

describe('AdminUserAcceptDenyComponent', () => {
  let component: AdminUserAcceptDenyComponent;
  let fixture: ComponentFixture<AdminUserAcceptDenyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserAcceptDenyComponent]
    });
    fixture = TestBed.createComponent(AdminUserAcceptDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
