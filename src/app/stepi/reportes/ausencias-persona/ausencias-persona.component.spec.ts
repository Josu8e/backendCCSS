import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciasPersonaComponent } from './ausencias-persona.component';

describe('AusenciasPersonaComponent', () => {
  let component: AusenciasPersonaComponent;
  let fixture: ComponentFixture<AusenciasPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusenciasPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciasPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
