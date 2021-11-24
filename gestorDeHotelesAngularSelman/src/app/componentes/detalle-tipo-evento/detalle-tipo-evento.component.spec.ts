import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTipoEventoComponent } from './detalle-tipo-evento.component';

describe('DetalleTipoEventoComponent', () => {
  let component: DetalleTipoEventoComponent;
  let fixture: ComponentFixture<DetalleTipoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTipoEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
