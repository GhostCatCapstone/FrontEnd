import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendrequesttoserverComponent } from './sendrequesttoserver.component';

describe('SendrequesttoserverComponent', () => {
  let component: SendrequesttoserverComponent;
  let fixture: ComponentFixture<SendrequesttoserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendrequesttoserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendrequesttoserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
