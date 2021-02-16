import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BoundingBoxModel } from 'src/app/Model/BoundingBoxModel';
import { Output, EventEmitter } from '@angular/core';
import { Shape } from 'src/app/Model/Shape';

let drawableCanvas: boolean = false;

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css'],
})
export class ImageDetailsComponent implements OnInit {
  @Input() src: string;
  private boxes: BoundingBoxModel[];
  @Input() set boundingBoxes(bb: BoundingBoxModel[]) {
    this.boxes = bb;
    this.ngAfterViewInit();
  }
  @Output() selectBoundingBoxEvent = new EventEmitter<BoundingBoxModel>();
  private normalizedBoxes: BoundingBoxModel[];
  public drawnShape: Shape = null;
  @Output() public drawnShapeEvent = new EventEmitter<Shape>();

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  canvasEl: any;
  ctx: CanvasRenderingContext2D;
  image;
  imgWidth: number;
  imgHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');

    this.image = new Image();
    this.image.src = this.src;
    this.image.onload = () => {
      this.imgWidth = this.image.width;
      this.imgHeight = this.image.height;
      this.canvasEl.width = this.imgWidth;
      this.canvasEl.height = this.imgHeight;
      this.normalizedBoxes = this.normalizeBoundingBoxes(this.boxes);
      this.draw();
    };
  }

  private normalizeBoundingBoxes(boundingBoxes: BoundingBoxModel[]): any {
    if (this.canvasEl == undefined) {
      return boundingBoxes;
    }

    let newBoxes = [];

    if (boundingBoxes != null) {
      for (let i = 0; i < boundingBoxes.length; ++i) {
        let currBox = boundingBoxes[i];
        let x = this.canvasEl.width * currBox.xVal;
        let y = this.canvasEl.height * currBox.yVal;
        let h = this.canvasEl.height * currBox.height;
        let w = this.canvasEl.width * currBox.width;
        newBoxes.push(new BoundingBoxModel(currBox.id, currBox.imgId, x, y, w, h, currBox.classes, currBox.color));
      }
    }

    return newBoxes;
  }

  private draw(index: number = -1) {
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.canvasEl.width,
      this.canvasEl.height
    );
    this.drawBoundingBoxes(index);
  }

  private drawBoundingBoxes(index: number = -1) {
    if (this.normalizedBoxes == null) {
      return;
    }

    for (let i = 0; i < this.normalizedBoxes.length; ++i) {
      this.ctx.beginPath();
      let currBox = this.normalizedBoxes[i];
      this.ctx.rect(currBox.xVal, currBox.yVal, currBox.width, currBox.height);
      this.ctx.lineWidth = this.normalizeLineWidth();
      if (i == index) {
        this.ctx.strokeStyle = '#00AEEF';
      } else {
        this.ctx.strokeStyle = currBox.color;
      }
      this.ctx.stroke();
    }
  }

  private normalizeLineWidth(): number {
    var lineWidth = 5;

    var bounds = this.canvasEl.getBoundingClientRect();

    var boundsVal = bounds.width < bounds.height ? bounds.height : bounds.width;
    var canvasVal =
      bounds.width < bounds.height ? this.canvasEl.height : this.canvasEl.width;

    lineWidth /= boundsVal;
    lineWidth *= canvasVal;

    return lineWidth;
  }

  private mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    mousedown: false,
  };

  private normalizePosition(event) {
    var bounds = this.canvasEl.getBoundingClientRect();

    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;

    // normalize mouse coordinates
    this.mouse.x /= bounds.width;
    this.mouse.y /= bounds.height;

    // scale mouse coordinates
    this.mouse.x *= this.canvasEl.width;
    this.mouse.y *= this.canvasEl.height;
  }

  public mouseDown(event: any) {
    this.normalizePosition(event);

    this.mouse.lastX = this.mouse.x;
    this.mouse.lastY = this.mouse.y;
    this.mouse.mousedown = true;
  }

  public mouseUp(event: any) {
    this.mouse.mousedown = false;

    if (this.drawnShape != null) {
      this.drawnShapeEvent.emit(this.drawnShape);
    }
  }

  public mouseMove(event: any) {
    this.normalizePosition(event);

    if (this.mouse.mousedown && drawableCanvas) {
      this.draw();
      this.ctx.beginPath();
      var width = this.mouse.x - this.mouse.lastX;
      var height = this.mouse.y - this.mouse.lastY;
      this.ctx.rect(this.mouse.lastX, this.mouse.lastY, width, height);
      this.ctx.strokeStyle = '#00AEEF';
      this.ctx.lineWidth = this.normalizeLineWidth();
      this.ctx.stroke();
      this.drawnShape = { x: this.mouse.lastX / this.canvasEl.width, y: this.mouse.lastY / this.canvasEl.height, w: width / this.canvasEl.width, h: height / this.canvasEl.height };
    }
  }

  public dblClick(event: any) {
    let selectedBox: boolean = false;
    this.drawnShape = null;
    this.drawnShapeEvent.emit(this.drawnShape);

    if (this.normalizedBoxes == null) {
      return;
    }

    for (let i = 0; i < this.normalizedBoxes.length; ++i) {
      let currBox = this.normalizedBoxes[i];
      if (
        currBox.xVal <= this.mouse.x &&
        this.mouse.x <= currBox.xVal + currBox.width &&
        currBox.yVal <= this.mouse.y &&
        this.mouse.y <= currBox.yVal + currBox.height
      ) {
        selectedBox = true;
        this.selectBoundingBoxEvent.emit(this.normalizedBoxes[i]);
        this.draw(i);
      }
    }

    if (!selectedBox) {
      this.draw();
      this.selectBoundingBoxEvent.emit(null);
    }
  }

  public addNewBoundingBox(b: boolean) {
    drawableCanvas = b;

    if (!b) {
      this.drawnShape = null;
      this.drawnShapeEvent.emit(this.drawnShape);
      this.ngAfterViewInit();
    }
  }
}
