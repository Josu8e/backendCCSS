import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombrarElegiblesComponent } from './nombrar-elegibles.component';

describe('NombrarElegiblesComponent', () => {
  let component: NombrarElegiblesComponent;
  let fixture: ComponentFixture<NombrarElegiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombrarElegiblesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombrarElegiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
