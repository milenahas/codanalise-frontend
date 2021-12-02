import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasAulasComponent } from './minhas-aulas.component';

describe('MinhasAulasComponent', () => {
  let component: MinhasAulasComponent;
  let fixture: ComponentFixture<MinhasAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
