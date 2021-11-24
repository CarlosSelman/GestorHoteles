import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaEventoComponent } from './detalle-tabla-evento.component';

describe('DetalleTablaEventoComponent', () => {
  let component: DetalleTablaEventoComponent;
  let fixture: ComponentFixture<DetalleTablaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
