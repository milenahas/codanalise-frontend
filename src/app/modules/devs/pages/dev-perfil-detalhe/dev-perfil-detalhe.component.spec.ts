import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPerfilDetalheComponent } from './dev-perfil-detalhe.component';

describe('DevPerfilDetalheComponent', () => {
  let component: DevPerfilDetalheComponent;
  let fixture: ComponentFixture<DevPerfilDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevPerfilDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPerfilDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
