import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPresupuestoComponent } from './listar-presupuesto.component';

describe('ListarPresupuestoComponent', () => {
  let component: ListarPresupuestoComponent;
  let fixture: ComponentFixture<ListarPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
