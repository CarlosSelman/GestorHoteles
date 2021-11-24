import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHotelComponent } from './detalle-hotel.component';

describe('DetalleHotelComponent', () => {
  let component: DetalleHotelComponent;
  let fixture: ComponentFixture<DetalleHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
