import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitadasVsaprobadasComponent } from './solicitadas-vsaprobadas.component';

describe('SolicitadasVsaprobadasComponent', () => {
  let component: SolicitadasVsaprobadasComponent;
  let fixture: ComponentFixture<SolicitadasVsaprobadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitadasVsaprobadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitadasVsaprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
