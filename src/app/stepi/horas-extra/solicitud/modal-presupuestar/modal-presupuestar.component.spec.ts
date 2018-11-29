import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPresupuestarComponent } from './modal-presupuestar.component';

describe('ModalPresupuestarComponent', () => {
  let component: ModalPresupuestarComponent;
  let fixture: ComponentFixture<ModalPresupuestarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPresupuestarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPresupuestarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
