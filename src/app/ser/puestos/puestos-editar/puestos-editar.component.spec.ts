import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosEditarComponent } from './puestos-editar.component';

describe('PuestosEditarComponent', () => {
  let component: PuestosEditarComponent;
  let fixture: ComponentFixture<PuestosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuestosEditarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
