import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltranbancComponent } from './modaltranbanc.component';

describe('ModaltranbancComponent', () => {
  let component: ModaltranbancComponent;
  let fixture: ComponentFixture<ModaltranbancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltranbancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltranbancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
