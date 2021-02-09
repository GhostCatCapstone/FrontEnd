import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css'],
})
export class ImageThumbnailsPageComponent implements OnInit {
  items: GalleryItem[];

  public currIndex: number = 0;
  public selectedBox: BoundingBoxModel;
  private newBBLookup = { id: "", src: "" };

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
                boundingBoxes: this.addColorsToBoundingBoxes(image.boundingBoxes),
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

  private addColorsToBoundingBoxes(boxes: BoundingBoxModel[]): BoundingBoxModel[] {
    for (let i = 0; i < COLORS.length && i < boxes.length; ++i) {
      boxes[i].color = COLORS[i];
    }
    return boxes;
  }

  public indexChanged(event) {
    this.currIndex = event.currIndex;
    if (this.newBBLookup != null) {
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

  @ViewChild('image') imageDetailsComponent: ImageDetailsComponent;

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
    if (src == null) {
      this.imageDetailsComponent.addNewBoundingBox(false);
      this.newBBLookup = null;
    } else {
      let myId = uuid.v4();
      var parts = src.split("/");
      var imgId = parts[parts.length - 1];
      let newBBModel: BoundingBoxModel = null;

      let classes = {};
      let item = this.items.find(item => item.data.src == src);

      if (item != undefined) {
        let bbs = item.data.boundingBoxes;
        if (bbs.length > 0) {
          let classNames = [];
          for (let varName in bbs[0].classes) {
            classNames.push(varName);
          }

          classNames.forEach(function (c) {
            classes[c] = 0;
          });
        }

        let newBB = { id: myId, imgId: imgId, xVal: 0, yVal: 0, width: 0, height: 0, classes: classes, color: "" };
        newBBModel = new BoundingBoxModel(newBB.id, newBB.imgId, newBB.xVal, newBB.yVal, newBB.width, newBB.height, newBB.classes, newBB.color);
        item.data.boundingBoxes.push(newBB);
        item.data.boundingBoxes = this.addColorsToBoundingBoxes(item.data.boundingBoxes);
      }

      this.newBBLookup = { id: newBBModel.id, src: src };
      this.sidebarComponent.selectedBoxChanged(newBBModel);
      this.sidebarComponent.addingNewBoxId(newBBModel.id);
      this.imageDetailsComponent.addNewBoundingBox(true);
    }
  }

  public cancelAddingBox() {
    let item = this.items.find(item => item.data.src == this.newBBLookup.src);
    let boxes = item.data.boundingBoxes.filter(box => box.id != this.newBBLookup.id);
    item.data.boundingBoxes = boxes;
    this.newBBLookup = null;
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
