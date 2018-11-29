import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosPorPuestoComponent } from './funcionarios-por-puesto.component';

describe('FuncionariosPorPuestoComponent', () => {
  let component: FuncionariosPorPuestoComponent;
  let fixture: ComponentFixture<FuncionariosPorPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionariosPorPuestoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosPorPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
