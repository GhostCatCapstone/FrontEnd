import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRegisterPageComponent } from './internal-register-page.component';

describe('InternalRegisterPageComponent', () => {
  let component: InternalRegisterPageComponent;
  let fixture: ComponentFixture<InternalRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalRegisterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
