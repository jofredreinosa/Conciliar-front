import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmcuenBancComponent } from './frmcuen-banc.component';

describe('FrmcuenBancComponent', () => {
  let component: FrmcuenBancComponent;
  let fixture: ComponentFixture<FrmcuenBancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmcuenBancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmcuenBancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
