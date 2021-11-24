import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaTipoEventoComponent } from './detalle-tabla-tipo-evento.component';

describe('DetalleTablaTipoEventoComponent', () => {
  let component: DetalleTablaTipoEventoComponent;
  let fixture: ComponentFixture<DetalleTablaTipoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTablaTipoEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaTipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
