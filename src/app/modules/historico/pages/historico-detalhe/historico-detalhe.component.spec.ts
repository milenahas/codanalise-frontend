import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDetalheComponent } from './historico-detalhe.component';

describe('HistoricoDetalheComponent', () => {
  let component: HistoricoDetalheComponent;
  let fixture: ComponentFixture<HistoricoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
