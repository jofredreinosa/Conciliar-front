import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTipoTransComponent } from './buscar-tipo-trans.component';

describe('BuscarTipoTransComponent', () => {
  let component: BuscarTipoTransComponent;
  let fixture: ComponentFixture<BuscarTipoTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarTipoTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarTipoTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
