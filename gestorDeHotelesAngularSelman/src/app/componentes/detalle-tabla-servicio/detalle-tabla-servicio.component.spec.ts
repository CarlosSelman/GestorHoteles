import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaServicioComponent } from './detalle-tabla-servicio.component';

describe('DetalleTablaServicioComponent', () => {
  let component: DetalleTablaServicioComponent;
  let fixture: ComponentFixture<DetalleTablaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
