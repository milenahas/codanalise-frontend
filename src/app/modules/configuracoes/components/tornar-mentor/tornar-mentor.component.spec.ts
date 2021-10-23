import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornarMentorComponent } from './tornar-mentor.component';

describe('TornarMentorComponent', () => {
  let component: TornarMentorComponent;
  let fixture: ComponentFixture<TornarMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TornarMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TornarMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
