import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from 'ng-gallery';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ServerFacade } from '../../Proxy/ServerFacade';
import { ImageQueryRequest } from 'src/app/Model/ImageQueryRequest';
import { ImageQueryResponse } from 'src/app/Model/ImageQueryResponse';
import { ClassValue } from 'src/app/Model/ClassValue';
import { dummyData } from 'src/app/Proxy/DummyData';

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

    let classValueArray: ClassValue[] = [];
    let cameraTrap: null | string = null;
    let minDate: null | number = null;
    let maxDate: null | number = null;

    if (history.state.searchParameters.searchByAnimal) {
      classValueArray = [
        new ClassValue(
          history.state.searchParameters.animalType,
          history.state.searchParameters.confidenceLevel
        ),
      ];
    }

    if (history.state.searchParameters.searchByCamera) {
      cameraTrap = history.state.searchParameters.cameraTrap;
    }

    if (history.state.searchParameters.searchByDate) {
      if (history.state.searchParameters.dateType == 'between') {
        minDate = history.state.searchParameters.firstDate;
        maxDate = history.state.searchParameters.secondDate;
      } else if (history.state.searchParameters.dateType == 'before') {
        maxDate = history.state.searchParameters.firstDate;
      } else if (history.state.searchParameters.dateType == 'after') {
        minDate = history.state.searchParameters.firstDate;
      }
    }

    // TODO: this request should also add authentication
    const imageQueryRequest: ImageQueryRequest = new ImageQueryRequest(
      dummyData.researcherID,
      dummyData.authToken,
      dummyData.projectID,
      minDate,
      maxDate,
      null,
      cameraTrap,
      classValueArray
    );

    this.server
      .getImagesWithData(imageQueryRequest)
      .pipe(catchError(this.server.handleError('getImagesWithData')))
      .subscribe((response: ImageQueryResponse) => {
        if (response.success && response.images.length) {
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
        } else if (response.success) {
          // no images matched the criteria so we keep it empty
          alert('No images matched your search criteria. Please try again');
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
