import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCrearComponent } from './servicios-crear.component';

describe('ServiciosCrearComponent', () => {
  let component: ServiciosCrearComponent;
  let fixture: ComponentFixture<ServiciosCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosCrearComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
