import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPerfilComponent } from './dev-perfil.component';

describe('DevPerfilComponent', () => {
  let component: DevPerfilComponent;
  let fixture: ComponentFixture<DevPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
