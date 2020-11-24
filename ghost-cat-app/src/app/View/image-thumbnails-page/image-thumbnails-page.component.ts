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
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '1',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'https://480-wildlife-user-images.s3.amazonaws.com/1081493',
      thumb: 'https://480-wildlife-user-images.s3.amazonaws.com/1081493',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '2',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      thumb: 'https://image.shutterstock.com/image-photo/toronto-super-wide-panorama-260nw-165404111.jpg',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '3',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      thumb: 'https://img.pngio.com/tall-png-6-png-image-tall-png-354_864.png',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '4',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'https://effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg',
      thumb: 'https://effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '5',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'assets/smallimage.jpg',
      thumb: 'assets/smallimage.jpg',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '6',
        'CUDDEBACK',
        'Ambush',
      ],
    },
    {
      src: 'assets/lowresolution.jpg',
      thumb: 'assets/lowresolution.jpg',
      animalLabels: [
        'Horse',
        'Cow',
        'Deer',
      ],
      animalPercentages: [
        '5.02%',
        '4.89%',
        '92.86%',
      ],
      metadataLabels: [
        'Image',
        'Camera make',
        'Camera model',
      ],
      metadataValues: [
        '7',
        'CUDDEBACK',
        'Ambush',
      ],
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
          animalLabels: item.animalLabels,
          animalPercentages: item.animalPercentages,
          metadataLabels: item.metadataLabels,
          metadataValues: item.metadataValues,
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


