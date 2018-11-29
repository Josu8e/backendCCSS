import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegiblesMostrarComponent } from './elegibles-mostrar.component';

describe('ElegiblesMostrarComponent', () => {
  let component: ElegiblesMostrarComponent;
  let fixture: ComponentFixture<ElegiblesMostrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElegiblesMostrarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegiblesMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
