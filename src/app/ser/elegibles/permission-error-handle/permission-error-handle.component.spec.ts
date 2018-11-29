import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionErrorHandleComponent } from './permission-error-handle.component';

describe('PermissionErrorHandleComponent', () => {
  let component: PermissionErrorHandleComponent;
  let fixture: ComponentFixture<PermissionErrorHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionErrorHandleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionErrorHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
