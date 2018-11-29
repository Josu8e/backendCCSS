import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarReportePersonaComponent } from './mostrar-reporte-persona.component';

describe('MostrarReportePersonaComponent', () => {
  let component: MostrarReportePersonaComponent;
  let fixture: ComponentFixture<MostrarReportePersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarReportePersonaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarReportePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
