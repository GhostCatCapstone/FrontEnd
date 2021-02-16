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

const NUMBER_OF_DECIMALS: number = 3;

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css'],
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  public currIndex: number = 0;
  public selectedBox: BoundingBoxModel;
  public newBBLookup = { id: "", src: "" };

  private get imageDetailsComponent() {
    return this.imageDetailsComponentList.find(component => component.src == this.items[this.currIndex]["data"]["src"]);
  }

  constructor(
    public gallery: Gallery,
    private router: Router,
    private server: ServerFacade,
    public cdr: ChangeDetectorRef,
    public appRef: ApplicationRef,
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
                classLabels: [].concat.apply(
                  [],
                  image.boundingBoxes.map((bb) => Object.keys(bb.classes)).filter((v, i, a) => a.indexOf(v) === i)
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
      let valueArr: number[] = Object.values(boxes[i].classes).map((s: string) => parseFloat(s));
      boxes[i].classValues = valueArr.map((n: number) => (n * 100).toFixed(NUMBER_OF_DECIMALS));
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

      this.newBBLookup = { id: newBBModel.id, src: src };
      this.sidebarComponent.selectedBoxChanged(newBBModel);
      this.imageDetailsComponent.addNewBoundingBox(true);
    }
  }

  private createBBObject(src: string, item: any): any {
    let myId = uuid.v4();
    var parts = src.split("/");
    var imgId = parts[parts.length - 1];

    let classes = {};
    let classNames = [];
    for (let index in item.data.classLabels) {
      classNames.push(item.data.classLabels[index]);
    }

    classNames.forEach(function (c) {
      classes[c] = 0
    });

    return { id: myId, imgId: imgId, xVal: 0, yVal: 0, width: 0, height: 0, classes: classes, color: "" };
  }

  public selectNewBoxClass(className: string) {
    this.confirmBox(this.newBBLookup.id, className);

    this.sidebarComponent.selectedBoxChanged(null);
    this.imageDetailsComponent.addNewBoundingBox(false);
    this.newBBLookup = { id: "", src: "" };
  }

  public confirmBox(id: string, className: string = "") {
    let item = this.items[this.currIndex];

    if (item != undefined) {
      let bb = item.data.boundingBoxes.find(b => b.id == id);

      if (bb != undefined) {
        if (className == "") {
          className = Object.keys(bb.classes).reduce(function (a, b) { return bb.classes[a] > bb.classes[b] ? a : b });
        }

        for (let c in bb.classes) {
          if (c == className) {
            bb.classes[c] = 1;
          } else {
            bb.classes[c] = 0;
          }
        }
      }
    }
  }

  public cancelAddingBox() {
    let item = this.items.find(item => item.data.src == this.newBBLookup.src);
    let boxes = item.data.boundingBoxes.filter(box => box.id != this.newBBLookup.id);
    item.data.boundingBoxes = boxes;
    this.newBBLookup = { id: "", src: "" };
    this.imageDetailsComponent.addNewBoundingBox(false);
  }

  public drewShape(shape: Shape) {
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
