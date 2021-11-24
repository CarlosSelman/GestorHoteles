import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaReservacionComponent } from './detalle-tabla-reservacion.component';

describe('DetalleTablaReservacionComponent', () => {
  let component: DetalleTablaReservacionComponent;
  let fixture: ComponentFixture<DetalleTablaReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaReservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
