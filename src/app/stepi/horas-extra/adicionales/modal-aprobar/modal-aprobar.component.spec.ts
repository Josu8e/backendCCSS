import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobarComponent } from './modal-aprobar.component';

describe('ModalAprobarComponent', () => {
  let component: ModalAprobarComponent;
  let fixture: ComponentFixture<ModalAprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
