import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryItem } from 'ng-gallery';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ServerFacade } from '../../Proxy/ServerFacade';
import { ImageQueryRequest } from 'src/app/Model/ImageQueryRequest';
import { ImageQueryResponse } from 'src/app/Model/ImageQueryResponse';
import { ClassValue } from 'src/app/Model/ClassValue';
import { dummyData } from 'src/app/Proxy/DummyData';
import { BoundingBoxModel } from 'src/app/Model/BoundingBoxModel';
import { COLORS } from 'src/app/Model/Colors';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css'],
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];
  metaData: MetaData[];

  public currIndex: number = 0;
  public selectedBox: BoundingBoxModel;

  constructor(
    public gallery: Gallery,
    private router: Router,
    private server: ServerFacade,
    public cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.items = [
      new CustomItem({
        src: '',
        thumb: '',
        animalLabels: [],
        animalPercentages: [],
        metadataLabels: [],
        metadataValues: [],
        boundingBoxes: [],
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
                boundingBoxes: this.addColorsToBoundingBoxes(image.boundingBoxes),
              })
          );

          if (response.success && response.images.length) {
            this.metaData = response.images.map(
              (image) =>
                new MetaData(
                String(image.deployment),
                Number(image.imgWidth), 
                Number(image.imgHeight),
                String(image.flash),
                String(image.make),
                String(image.model),
                new Date(image.date),
                String(image.cameraTrap),
                String(image.night_im),
                String(image.id))
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
              boundingBoxes: [],
            }),
          ];
        } else {
          console.log('ERROR with image data request:', response.errorMsg);
        }
      });
  }

  private addColorsToBoundingBoxes(boxes: BoundingBoxModel[]): BoundingBoxModel[] {
    for (let i = 0; i < COLORS.length && i < boxes.length; ++i) {
      boxes[i].color = COLORS[i];
    }
    return boxes;
  }

  public indexChanged(event) {
    this.currIndex = event.currIndex;
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  downloadCsv(): void {
    let curDate = new Date().toLocaleDateString();
    CsvDataService.exportToCsv("metadata-" + curDate +  ".csv", this.metaData);
  }

  @ViewChild('sidebar') sidebarComponent: SidebarComponent;

  public selectedBoundingBox(bb: BoundingBoxModel): void {
    this.sidebarComponent.selectedBoxChanged(bb);
  }
}

export class CustomItem implements GalleryItem {
  readonly type = 'custom-item';
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class MetaData {
  ID: string;
  ExifImageWidth: number;
  ExifImageHeight: number;
  Flash: string;
  Make: string;
  Model: string;
  DateTime: Date;
  CameraTrapName: string;
  deployment: string;
  night_im: string;

  constructor(
  deployment: string,
  ExifImageWidth: number,
  ExifImageHeight: number,
  Flash: string,
  Make: string,
  Model: string,
  DateTime: Date,
  CameraTrapName: string,
  night_im: string,
  ID: string) {
    this.ID = ID;
    this.ExifImageWidth = ExifImageWidth;
    this.ExifImageHeight = ExifImageHeight;
    this.Flash = Flash;
    this.Make = Make;
    this.Model = Model;
    this.DateTime = DateTime;
    this.CameraTrapName = CameraTrapName;
    this.deployment = deployment;
    this.night_im = night_im;
  }
}

export class CsvDataService {
  static exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
