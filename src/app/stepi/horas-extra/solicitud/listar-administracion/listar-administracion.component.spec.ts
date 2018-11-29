import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdministracionComponent } from './listar-administracion.component';

describe('ListarAdministracionComponent', () => {
  let component: ListarAdministracionComponent;
  let fixture: ComponentFixture<ListarAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
