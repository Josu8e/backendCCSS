import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosPorServicioComponent } from './puestos-por-servicio.component';

describe('PuestosPorServicioComponent', () => {
  let component: PuestosPorServicioComponent;
  let fixture: ComponentFixture<PuestosPorServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuestosPorServicioComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosPorServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
