import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRealizarComponent } from './modal-realizar.component';

describe('ModalRealizarComponent', () => {
  let component: ModalRealizarComponent;
  let fixture: ComponentFixture<ModalRealizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRealizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
