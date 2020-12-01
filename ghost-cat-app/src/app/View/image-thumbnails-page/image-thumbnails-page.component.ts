import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from 'ng-gallery';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { imageData } from '../../Proxy/DummyData';
import { ServerFacade } from '../../Proxy/ServerFacade';
import { ImageQueryRequest } from 'src/app/Model/ImageQueryRequest';
import { ImageQueryResponse } from 'src/app/Model/ImageQueryResponse';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css'],
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  public currIndex: number = 0;

  constructor(
    public gallery: Gallery,
    private router: Router,
    private server: ServerFacade
  ) {}

  ngOnInit() {
    // This commented out code is an example of how to fill the items with dummy data
    // Please note that if you want to work with dummy data, you should also comment out
    // the lines below that fetch data from the server.

    // this.items = imageData.map(
    //   (item) =>
    //     new CustomItem({
    //       src: item.src,
    //       thumb: item.thumb,
    //       animalLabels: item.animalLabels,
    //       animalPercentages: item.animalPercentages,
    //       metadataLabels: item.metadataLabels,
    //       metadataValues: item.metadataValues,
    //     })
    // );

    this.items = [
      new CustomItem({
        src: '',
        thumb: '',
        animalLabels: [],
        animalPercentages: [],
        metadataLabels: [],
        metadataValues: [],
      }),
    ];

    // This request is a hard-coded request that will be replaced by data from the search
    // TODO: this request should also add authentication
    const imageQueryRequest = new ImageQueryRequest(
      'researcherID',
      'token',
      'projectID'
    );

    this.server
      .getImagesWithData(imageQueryRequest)
      .pipe(catchError(this.server.handleError('getImagesWithData')))
      .subscribe((response: ImageQueryResponse) => {
        console.log(response);
        if (response.success) {
          this.items = response.images.map(
            (image) =>
              new CustomItem({
                src: image.imgLink,
                thumb: image.imgLink,
                animalLabels: [].concat.apply(
                  [],
                  image.boundingBoxes.map((bb) => Object.keys(bb.classes))
                ),
                animalPercentages: [].concat.apply(
                  [],
                  image.boundingBoxes.map((bb) => Object.values(bb.classes))
                ),
                metadataLabels: [
                  'Image Width',
                  'Image Height',
                  'Flash',
                  'Make',
                  'Model',
                  'Date',
                  'Camera Trap',
                  'Deployment',
                  'Night Image',
                ],
                metadataValues: [
                  image.imgWidth,
                  image.imgHeight,
                  image.flash,
                  image.make,
                  image.model,
                  image.date,
                  image.cameraTrap,
                  image.deployment,
                  image.night_im,
                ],
              })
          );
        } else {
          console.log('ERROR with image data request:', response.errorMsg);
        }
      });
  }

  public indexChanged(event) {
    this.currIndex = event.currIndex;
  }

  goToPage(pageName: string): void {
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
