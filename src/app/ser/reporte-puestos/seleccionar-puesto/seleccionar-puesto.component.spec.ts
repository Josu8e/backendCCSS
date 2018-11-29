import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPuestoComponent } from './seleccionar-puesto.component';

describe('SeleccionarPuestoComponent', () => {
  let component: SeleccionarPuestoComponent;
  let fixture: ComponentFixture<SeleccionarPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarPuestoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
