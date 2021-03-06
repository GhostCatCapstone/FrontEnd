import { ApplicationRef, ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Gallery, GalleryItem, GalleryRef } from 'ng-gallery';
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
import * as uuid from 'uuid';
import { Shape } from 'src/app/Model/Shape';
import { DeleteBBoxRequest } from 'src/app/Model/DeleteBBoxRequest';
import { DeleteBBoxResponse } from 'src/app/Model/DeleteBBoxResponse';
import { AddBBoxRequest } from 'src/app/Model/AddBBoxRequest';
import { AddBBoxResponse } from 'src/app/Model/AddBBoxResponse';
import { UpdateBBoxRequest } from 'src/app/Model/UpdateBBoxRequest';
import { UpdateBBoxResponse } from 'src/app/Model/UpdateBBoxResponse';
import { AuthorizationService } from "../../Auth/authorization.service";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CameraLocation } from 'src/app/Model/CameraLocation';
import * as moment from 'moment';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css'],
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  public currIndex: number = 0;
  public selectedBox: BoundingBoxModel;
  public newBBLookup = { id: "", src: "", imgId: "" };
  private drawnShape: Shape = null;

  private projectClasses = history.state.searchParameters.classes;
  private projectCameraTraps = history.state.searchParameters.cameraTraps;

  private get imageDetailsComponent() {
    return this.imageDetailsComponentList.find(component => component.src == this.items[this.currIndex]["data"]["src"]);
  }

  constructor(
    public gallery: Gallery,
    private router: Router,
    private server: ServerFacade,
    public cdr: ChangeDetectorRef,
    public appRef: ApplicationRef,
    private auth: AuthorizationService,
  ) { }

  ngOnInit() {
    this.items = [
      new CustomItem({
        src: '',
        thumb: '',
        classLabels: [],
        metadataLabels: [],
        metadataValues: [],
        boundingBoxes: [],
      }),
    ];

    let classValueArray: ClassValue[] = [];
    let cameraTraps: null | string[] = [];
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
      cameraTraps = Object.assign([], history.state.searchParameters.cameraTraps);
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

    var username = this.auth.getUserName();
    const imageQueryRequest: ImageQueryRequest = new ImageQueryRequest(
      username,
      history.state.searchParameters.project,
      minDate,
      maxDate,
      null,
      cameraTraps,
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
                classLabels: this.projectClasses,
                metadataLabels: [
                  'Image ID',
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
                  image.id,
                  image.imgWidth,
                  image.imgHeight,
                  image.flash,
                  image.make,
                  image.model,
                  new Date(image.date),
                  image.cameraTrap,
                  image.deployment,
                  image.night_im,
                ],
                boundingBoxes: this.initializeBoundingBoxes(image.boundingBoxes),
              })
          );

        } else if (response.success) {
          // no images matched the criteria so we keep it empty
          alert('No images matched your search criteria. Please try again');
          this.items = [
            new CustomItem({
              src: '',
              thumb: '',
              classLabels: [],
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

  @ViewChild('galleryID') galleryRef: GalleryRef;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowRight') {
      this.galleryRef.next();
    }

    if (event.key == 'ArrowLeft') {
      this.galleryRef.prev();
    }
  }

  private initializeBoundingBoxes(boxes: BoundingBoxModel[]): BoundingBoxModel[] {
    for (let i = 0; i < boxes.length; ++i) {
      let keys = Object.keys(<any>boxes[i].classes);
      let values = Object.values(<any>boxes[i].classes);

      let newClasses: ClassValue[] = [];
      for (let j = 0; j < keys.length; ++j) {
        let val = (<number>values[j]);
        newClasses.push(new ClassValue(keys[j], val));
      }
      boxes[i].classes = newClasses;
    }
    return this.addColorsToBoundingBoxes(boxes);
  }

  private addColorsToBoundingBoxes(boxes: BoundingBoxModel[]): BoundingBoxModel[] {
    for (let i = 0; i < COLORS.length && i < boxes.length; ++i) {
      boxes[i].color = COLORS[i];
    }
    return boxes;
  }

  public indexChanged(event) {
    this.currIndex = event.currIndex;
    if (this.newBBLookup.id != "") {
      this.cancelAddingBox();
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  downloadCsv(): void {
    let curDate = (moment(new Date())).format('MM-DD-YYYY');
    let rows = this.configureMetadataRows();
    CsvDataService.exportToCsv(curDate + "-metadata.csv", rows);
  }

  private configureMetadataRows() {
    let metadata = [];

    let bboxes = this.getAllBBoxes();
    let max = Math.max(this.projectClasses.length, this.items.length, this.projectCameraTraps.length, bboxes.length);

    for (let i = 0; i < max; ++i) {
      let row = new MetadataRow();
      if (i == 0) {
        row.ProjectID = history.state.searchParameters.project;
        row.UserID = this.auth.getUserName();
        row.NumberOfClasses = this.projectClasses.length;
        row.NumberOfImages = this.items.length;
        row.NumberOfCameraTraps = this.projectCameraTraps.length;
        row.NumberOfBoundingBoxes = bboxes.length;
      }

      if (i < this.projectClasses.length) {
        row.Classes = this.projectClasses[i];
      }

      if (i < this.items.length) {
        let image = this.items[i].data;

        row.ImageID = image.metadataValues[0];
        row.ImageLink = image.src;
        row.ImageWidth = image.metadataValues[1];
        row.ImageHeight = image.metadataValues[2];
        row.Flash = image.metadataValues[3];
        row.CameraMake = image.metadataValues[4];
        row.CameraModel = image.metadataValues[5];
        row.DateTime = (moment(image.metadataValues[6])).format('MM-DD-YYYY HH:mm:ss');
        row.CameraTrapName = image.metadataValues[7];
        row.Deployment = image.metadataValues[8];
        row.NightImage = image.metadataValues[9];
      }

      if (i < this.projectCameraTraps.length) {
        row.CameraTrapID = this.projectCameraTraps[i].label;
        row.Latitude = this.projectCameraTraps[i].latitude;
        row.Longitude = this.projectCameraTraps[i].longitude;
      }

      if (i < bboxes.length) {
        row.BoundingBoxID = bboxes[i].id;
        row.BBoxImageID = bboxes[i].imgId;
        row.BBoxX = bboxes[i].xVal;
        row.BBoxY = bboxes[i].yVal;
        row.BBoxWidth = bboxes[i].width;
        row.BBoxHeight = bboxes[i].height;
        for (let j = 0; j < bboxes[i].classes.length; ++j) {
          let key = "Class" + (j + 1).toString();
          row[key] = bboxes[i].classes[j].classValue;
        }
      }

      metadata.push(row);
    }

    return metadata;
  }

  private getAllBBoxes() {
    let boxes = [];
    for (let i = 0; i < this.items.length; ++i) {
      boxes = boxes.concat(this.items[i].data.boundingBoxes);
    }
    return boxes;
  }

  public async logout(): Promise<void> {
    //console.log("About to call logout function\n");
    this.auth.logout();
    this.router.navigate([`/login`]);
  }

  @ViewChild('sidebar') sidebarComponent: SidebarComponent;

  public selectedBoundingBox(bb: BoundingBoxModel): void {
    this.sidebarComponent.selectedBoxChanged(bb);
  }

  @ViewChildren('image') imageDetailsComponentList: QueryList<ImageDetailsComponent>;

  public deletedBoundingBoxes(bb: BoundingBoxModel[]) {
    for (let i = 0; i < this.items.length; ++i) {
      let currBoxes = this.items[i].data.boundingBoxes;
      let filteredBoxes = [];

      for (let j = 0; j < currBoxes.length; ++j) {
        if (bb.find(b => b.id == currBoxes[j].id) == undefined) {
          filteredBoxes.push(currBoxes[j]);
        } else {
          let deleteBBoxRequest: DeleteBBoxRequest = new DeleteBBoxRequest(this.auth.getUserName(), history.state.searchParameters.project, currBoxes[j].id);

          this.server.deleteBoundingBox(deleteBBoxRequest).pipe(catchError(this.server.handleError('deleteBBoxRequest'))).subscribe((response: DeleteBBoxResponse) => {
            if (response == undefined || response == null) {
              console.log('Received no response from server when deleting bounding box id: ' + currBoxes[j].id);
            }
            else if (!response.success) {
              console.log('Error while deleting bounding box id: ' + currBoxes[j].id + " ");
              console.log(response);
              console.log(response.errorMsg);
            }
          })
        }
      }

      this.items[i].data.boundingBoxes = this.addColorsToBoundingBoxes(filteredBoxes);
    }
  }

  public addNewBox(src: string) {
    let item = this.items.find(item => item.data.src == src);

    if (item != undefined) {
      let newBB = this.createBBObject(src, item);
      let newBBModel = new BoundingBoxModel(newBB.id, newBB.imgId, newBB.xVal, newBB.yVal, newBB.width, newBB.height, newBB.classes, newBB.color);

      item.data.boundingBoxes.push(newBB);
      item.data.boundingBoxes = this.addColorsToBoundingBoxes(item.data.boundingBoxes);
      this.appRef.tick();

      this.newBBLookup = { id: newBBModel.id, src: src, imgId: newBBModel.imgId };
      this.sidebarComponent.selectedBoxChanged(newBBModel);
      this.imageDetailsComponent.addNewBoundingBox(true);
    }
  }

  private createBBObject(src: string, item: any): any {
    let myId = uuid.v4();
    let parts = src.split("/");
    let imgId = parts[parts.length - 1];

    let classes: ClassValue[] = [];
    for (let index in item.data.classLabels) {
      classes.push(new ClassValue(item.data.classLabels[index], 0));
    }

    return { id: myId, imgId: imgId, xVal: 0, yVal: 0, width: 0, height: 0, classes: classes, color: "" };
  }

  public selectNewBoxClass(className: string) {
    this.selectBox({ id: this.newBBLookup.id, className: className }, false);

    let addBBoxRequest: AddBBoxRequest = new AddBBoxRequest(
      this.auth.getUserName(),
      history.state.searchParameters.project,
      this.newBBLookup.imgId,
      this.drawnShape.x,
      this.drawnShape.y,
      this.drawnShape.w,
      this.drawnShape.h,
      className);

    this.server.addBoundingBox(addBBoxRequest).pipe(catchError(this.server.handleError('addBoundingBox'))).subscribe((response: AddBBoxResponse) => {
      if (response == undefined || response == null) {
        console.log('Received no response from server while adding bounding box id: ' + this.newBBLookup.id);
      }
      else if (!response.success) {
        console.log('Error while adding bounding box');
        console.log(response);
      }
    })

    this.sidebarComponent.selectedBoxChanged(null);
    this.imageDetailsComponent.addNewBoundingBox(false);
    this.newBBLookup = { id: "", src: "", imgId: "" };
  }

  public selectBox({ id, className }, updateServer = true) {
    let item = this.items[this.currIndex];

    if (item != undefined) {
      let bb = <BoundingBoxModel>item.data.boundingBoxes.find(b => b.id == id);

      if (bb != undefined) {
        if (className == "") {
          className = bb.classes.reduce(function (a, b) {
            return a.classValue > b.classValue ? a : b
          }).className;
        }

        for (let i = 0; i < bb.classes.length; ++i) {
          if (bb.classes[i].className == className) {
            bb.classes[i].classValue = 100;
          } else {
            bb.classes[i].classValue = 0;
          }
        }

        if (updateServer) {
          let updateBBoxRequest: UpdateBBoxRequest = new UpdateBBoxRequest(
            this.auth.getUserName(),
            history.state.searchParameters.project,
            id,
            className
          );

          this.server.updateBoundingBox(updateBBoxRequest).pipe(catchError(this.server.handleError('updateBoundingBox'))).subscribe((response: UpdateBBoxResponse) => {
            if (response == undefined || response == null) {
              console.log('Received no response from server while updating bounding box id ' + id);
            }
            else if (!response.success) {
              console.log('Error while updating bounding box id: ' + id + " ");
              console.log(response);
            }
          })
        }
      }
    }
  }

  public cancelAddingBox() {
    let item = this.items.find(item => item.data.src == this.newBBLookup.src);
    let boxes = item.data.boundingBoxes.filter(box => box.id != this.newBBLookup.id);
    item.data.boundingBoxes = boxes;
    this.newBBLookup = { id: "", src: "", imgId: "" };
    this.imageDetailsComponent.addNewBoundingBox(false);
  }

  public drewShape(shape: Shape) {
    this.drawnShape = shape;
    if (shape == null) {
      this.sidebarComponent.shapeDrawn(false);
    } else {
      let item = this.items.find(item => item.data.src == this.newBBLookup.src);
      let newBB = item.data.boundingBoxes.find(box => box.id == this.newBBLookup.id);
      newBB.xVal = shape.x;
      newBB.yVal = shape.y;
      newBB.width = shape.w;
      newBB.height = shape.h;
      this.sidebarComponent.shapeDrawn(true);
    }
  }
}

export class CustomItem implements GalleryItem {
  readonly type = 'custom-item';
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class MetadataRow {
  ProjectID: string = undefined;
  UserID: string = undefined;
  NumberOfClasses: number = undefined;
  Classes: string = undefined;
  NumberOfImages: number = undefined;
  ImageID: string = undefined;
  ImageLink: string = undefined;
  ImageWidth: number = undefined;
  ImageHeight: number = undefined;
  Flash: string = undefined;
  CameraMake: string = undefined;
  CameraModel: string = undefined;
  DateTime: string = undefined;
  CameraTrapName: string = undefined;
  Deployment: string = undefined;
  NightImage: string = undefined;
  NumberOfCameraTraps: number = undefined;
  CameraTrapID: string = undefined;
  Latitude: number = undefined;
  Longitude: number = undefined;
  NumberOfBoundingBoxes: number = undefined;
  BoundingBoxID: string = undefined;
  BBoxImageID: string = undefined;
  BBoxX: number = undefined;
  BBoxY: number = undefined;
  BBoxWidth: number = undefined;
  BBoxHeight: number = undefined;
}

export class CsvDataService {
  static exportToCsv(filename: string, rows: MetadataRow[]) {
    if (!rows || !rows.length || rows.length <= 0) {
      return;
    }
    const separator = ',';
    let keys = Object.keys(rows[0]);

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
