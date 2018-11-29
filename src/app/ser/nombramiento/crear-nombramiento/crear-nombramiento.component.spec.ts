import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNombramientoComponent } from './crear-nombramiento.component';

describe('CrearNombramientoComponent', () => {
  let component: CrearNombramientoComponent;
  let fixture: ComponentFixture<CrearNombramientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearNombramientoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNombramientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
