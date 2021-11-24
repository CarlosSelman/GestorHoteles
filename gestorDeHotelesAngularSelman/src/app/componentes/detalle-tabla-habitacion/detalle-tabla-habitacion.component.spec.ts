import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaHabitacionComponent } from './detalle-tabla-habitacion.component';

describe('DetalleTablaHabitacionComponent', () => {
  let component: DetalleTablaHabitacionComponent;
  let fixture: ComponentFixture<DetalleTablaHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaHabitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
