import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObservacionesComponent } from './modal-observaciones.component';

describe('ModalObservacionesComponent', () => {
  let component: ModalObservacionesComponent;
  let fixture: ComponentFixture<ModalObservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalObservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
