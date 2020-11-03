import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageThumbnailsPageComponent } from './image-thumbnails-page.component';

describe('ImageThumbnailsPageComponent', () => {
  let component: ImageThumbnailsPageComponent;
  let fixture: ComponentFixture<ImageThumbnailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageThumbnailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageThumbnailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
