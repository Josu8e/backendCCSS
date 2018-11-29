import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosCrearComponent } from './puestos-crear.component';

describe('PuestosCrearComponent', () => {
  let component: PuestosCrearComponent;
  let fixture: ComponentFixture<PuestosCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuestosCrearComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
