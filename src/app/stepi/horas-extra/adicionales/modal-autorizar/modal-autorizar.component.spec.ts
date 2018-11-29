import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutorizarComponent } from './modal-autorizar.component';

describe('ModalAutorizarComponent', () => {
  let component: ModalAutorizarComponent;
  let fixture: ComponentFixture<ModalAutorizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAutorizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
