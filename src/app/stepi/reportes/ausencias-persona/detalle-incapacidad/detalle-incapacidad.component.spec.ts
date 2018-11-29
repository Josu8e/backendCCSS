import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleIncapacidadComponent } from './detalle-incapacidad.component';

describe('DetalleIncapacidadComponent', () => {
  let component: DetalleIncapacidadComponent;
  let fixture: ComponentFixture<DetalleIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
