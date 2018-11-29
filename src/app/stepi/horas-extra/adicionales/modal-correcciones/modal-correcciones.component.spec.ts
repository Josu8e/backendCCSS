import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCorreccionesComponent } from './modal-correcciones.component';

describe('ModalCorreccionesComponent', () => {
  let component: ModalCorreccionesComponent;
  let fixture: ComponentFixture<ModalCorreccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCorreccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCorreccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
