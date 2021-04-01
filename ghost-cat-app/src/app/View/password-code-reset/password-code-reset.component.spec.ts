import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCodeResetComponent } from './password-code-reset.component';

describe('PasswordCodeResetComponent', () => {
  let component: PasswordCodeResetComponent;
  let fixture: ComponentFixture<PasswordCodeResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordCodeResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCodeResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
