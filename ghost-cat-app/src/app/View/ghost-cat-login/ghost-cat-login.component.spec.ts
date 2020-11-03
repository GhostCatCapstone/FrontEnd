import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostCatLoginComponent } from './ghost-cat-login.component';

describe('GhostCatLoginComponent', () => {
  let component: GhostCatLoginComponent;
  let fixture: ComponentFixture<GhostCatLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostCatLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostCatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
