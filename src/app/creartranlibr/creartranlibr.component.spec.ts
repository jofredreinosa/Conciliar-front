import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreartranlibrComponent } from './creartranlibr.component';

describe('CreartranlibrComponent', () => {
  let component: CreartranlibrComponent;
  let fixture: ComponentFixture<CreartranlibrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartranlibrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreartranlibrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
