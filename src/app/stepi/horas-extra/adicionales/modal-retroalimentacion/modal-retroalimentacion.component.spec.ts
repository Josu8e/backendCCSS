import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRetroalimentacionComponent } from './modal-retroalimentacion.component';

describe('ModalRetroalimentacionComponent', () => {
  let component: ModalRetroalimentacionComponent;
  let fixture: ComponentFixture<ModalRetroalimentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRetroalimentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRetroalimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
