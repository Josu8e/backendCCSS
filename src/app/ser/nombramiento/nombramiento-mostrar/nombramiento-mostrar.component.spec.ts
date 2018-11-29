import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombramientoMostrarComponent } from './nombramiento-mostrar.component';

describe('NombramientoMostrarComponent', () => {
  let component: NombramientoMostrarComponent;
  let fixture: ComponentFixture<NombramientoMostrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombramientoMostrarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombramientoMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
