import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreccionesComponent } from './correcciones.component';

describe('CorreccionesComponent', () => {
  let component: CorreccionesComponent;
  let fixture: ComponentFixture<CorreccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
