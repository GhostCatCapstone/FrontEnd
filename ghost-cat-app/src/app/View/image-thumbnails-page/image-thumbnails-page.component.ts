import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem} from 'ng-gallery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css']
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  public imageData = [
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'one',
        'horse',
        'cow',
      ],
      metadata: [
        'one',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'assets/GhostCatLogo.png',
      thumb: 'assets/GhostCatLogo.png',
      animals: [
        'two',
        'horse',
        'cow',
      ],
      metadata: [
        'two',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animals: [
        'three',
        'horse',
        'cow',
      ],
      metadata: [
        'three',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animals: [
        'four',
        'horse',
        'cow',
      ],
      metadata: [
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
        'four',
        'Camera make: CUDDEBACK',
        'Camera model: Ambush',
      ]
    },
  ];

  public currIndex: number = 0;

  constructor(public gallery: Gallery, private router:Router) { }

  ngOnInit() {
    // Note that src is not defined, instead we have observable
    this.items = this.imageData.map(
      (item) =>
        new CustomItem({
          src: item.src,
          thumb: item.thumb,
          animals: item.animals,
          metadata: item.metadata,
        })
    );
  }

  public indexChanged(event) {
    this.currIndex = event.currIndex;
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}

export class CustomItem implements GalleryItem {
  readonly type = 'custom-item';
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}


