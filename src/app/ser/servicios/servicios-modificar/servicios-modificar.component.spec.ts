import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosModificarComponent } from './servicios-modificar.component';

describe('ServiciosModificarComponent', () => {
  let component: ServiciosModificarComponent;
  let fixture: ComponentFixture<ServiciosModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosModificarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
