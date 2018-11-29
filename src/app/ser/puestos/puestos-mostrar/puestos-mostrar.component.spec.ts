import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosMostrarComponent } from './puestos-mostrar.component';

describe('PuestosMostrarComponent', () => {
  let component: PuestosMostrarComponent;
  let fixture: ComponentFixture<PuestosMostrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuestosMostrarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
