import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaHotelComponent } from './detalle-tabla-hotel.component';

describe('DetalleTablaHotelComponent', () => {
  let component: DetalleTablaHotelComponent;
  let fixture: ComponentFixture<DetalleTablaHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
