import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarComponent } from './realizar.component';

describe('RealizarComponent', () => {
  let component: RealizarComponent;
  let fixture: ComponentFixture<RealizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
