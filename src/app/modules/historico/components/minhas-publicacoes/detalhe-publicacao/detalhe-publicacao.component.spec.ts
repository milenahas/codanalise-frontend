import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePublicacaoComponent } from './detalhe-publicacao.component';

describe('DetalhePublicacaoComponent', () => {
  let component: DetalhePublicacaoComponent;
  let fixture: ComponentFixture<DetalhePublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhePublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
