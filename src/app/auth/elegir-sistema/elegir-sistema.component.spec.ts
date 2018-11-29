import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirSistemaComponent } from './elegir-sistema.component';

describe('ElegirSistemaComponent', () => {
  let component: ElegirSistemaComponent;
  let fixture: ComponentFixture<ElegirSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
