import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from 'ng-gallery';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css']
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  imageData = [
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      description: 'this is my description',
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      description: 'this is my 10 description',
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      description: 'this is my 3 description',
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      description: 'this is my 4 description',
    },
  ];

  constructor(public gallery: Gallery) {}

  ngOnInit() {
    // Note that src is not defined, instead we have observable

    this.items = this.imageData.map(
      (item) =>
        new CustomItem({
          src: item.src,
          thumb: item.thumb,
          description: item.description,
        })
    );
  }
}

export class CustomItem implements GalleryItem {
  readonly type = 'custom-item';
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}


