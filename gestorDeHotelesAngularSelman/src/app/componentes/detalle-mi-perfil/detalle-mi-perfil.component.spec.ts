import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMiPerfilComponent } from './detalle-mi-perfil.component';

describe('DetalleMiPerfilComponent', () => {
  let component: DetalleMiPerfilComponent;
  let fixture: ComponentFixture<DetalleMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMiPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
