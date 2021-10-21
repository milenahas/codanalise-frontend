import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsListagemComponent } from './devs-listagem.component';

describe('DevsListagemComponent', () => {
  let component: DevsListagemComponent;
  let fixture: ComponentFixture<DevsListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevsListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
