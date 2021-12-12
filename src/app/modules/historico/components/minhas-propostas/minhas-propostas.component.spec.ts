import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasPropostasComponent } from './minhas-propostas.component';

describe('MinhasPropostasComponent', () => {
  let component: MinhasPropostasComponent;
  let fixture: ComponentFixture<MinhasPropostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasPropostasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasPropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
