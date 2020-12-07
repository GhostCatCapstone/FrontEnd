import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BoundingBoxModel } from 'src/app/Model/BoundingBoxModel';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css'],
})
export class ImageDetailsComponent implements OnInit {
  @Input() src: string;
  @Input() boxes: BoundingBoxModel[];
  @Output() selectBoundingBoxEvent = new EventEmitter<BoundingBoxModel>();
  private drawableCanvas: boolean = false;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

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
      this.draw();
    };
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
    for (let i = 0; i < this.boxes.length; ++i) {
      this.ctx.beginPath();
      let { x, y, h, w } = this.normalizeBoundingBox(this.boxes[i].xVal, this.boxes[i].yVal, this.boxes[i].height, this.boxes[i].width);
      this.ctx.rect(x, y, h, w);
      this.ctx.lineWidth = this.normalizeLineWidth();
      if (i == index) {
        this.ctx.strokeStyle = '#00AEEF';
      } else {
        this.ctx.strokeStyle = this.boxes[i].color;
      }
      this.ctx.stroke();
    }
  }

  private mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    mousedown: false,
  };

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

  private normalizePosition(event) {
    var bounds = this.canvasEl.getBoundingClientRect();

    // get the mouse coordinates, subtract the canvas top left
    this.mouse.x = event.pageX - bounds.left;
    this.mouse.y = event.pageY - bounds.top;

    // normalize mouse coordinates
    this.mouse.x /= bounds.width;
    this.mouse.y /= bounds.height;

    // scale mouse coordinates
    this.mouse.x *= this.canvasEl.width;
    this.mouse.y *= this.canvasEl.height;
  }

  private normalizeBoundingBox(xVal: number, yVal: number, height: number, width: number): { x: number, y: number, h: number, w: number } {
    let x = this.canvasEl.width * xVal;
    let y = this.canvasEl.height * yVal;
    let h = this.canvasEl.height * height;
    let w = this.canvasEl.width * width;
    return { x, y, h, w };
  }

  public mouseDown(event: any) {
    this.normalizePosition(event);

    this.mouse.lastX = this.mouse.x;
    this.mouse.lastY = this.mouse.y;
    this.mouse.mousedown = true;
  }

  public mouseUp(event: any) {
    this.mouse.mousedown = false;
  }

  public mouseMove(event: any) {
    this.normalizePosition(event);

    if (this.mouse.mousedown && this.drawableCanvas) {
      this.draw();
      this.ctx.beginPath();
      var width = this.mouse.x - this.mouse.lastX;
      var height = this.mouse.y - this.mouse.lastY;
      this.ctx.rect(this.mouse.lastX, this.mouse.lastY, width, height);
      this.ctx.strokeStyle = '#00AEEF';
      this.ctx.lineWidth = this.normalizeLineWidth();
      this.ctx.stroke();
    }
  }

  public dblClick(event: any) {
    let selectedBox: boolean = false;

    for (let i = 0; i < this.boxes.length; ++i) {
      let { x, y, h, w } = this.normalizeBoundingBox(this.boxes[i].xVal, this.boxes[i].yVal, this.boxes[i].height, this.boxes[i].width);
      if (
        x <= this.mouse.x &&
        this.mouse.x <= x + w &&
        y <= this.mouse.y &&
        this.mouse.y <= y + h
      ) {
        selectedBox = true;
        this.selectBoundingBoxEvent.emit(this.boxes[i]);
        this.draw(i);
      }
    }

    if (!selectedBox) {
      this.draw();
      this.selectBoundingBoxEvent.emit(null);
    }
  }
}
