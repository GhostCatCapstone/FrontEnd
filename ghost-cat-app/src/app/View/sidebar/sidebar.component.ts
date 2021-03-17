import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExpandableListComponent, ExpandableListModule } from 'angular-expandable-list';
import { BoundingBoxModel } from 'src/app/Model/BoundingBoxModel';
import { ClassValue } from 'src/app/Model/ClassValue';

const NUMBER_OF_DECIMALS: number = 3;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() numBoundingBoxes: number;
  @Input() src: string;
  @Input() classLabels: string[];
  @Input() metadataLabels: string[];
  @Input() metadataValues: string[];
  @Input() boundingBoxes: BoundingBoxModel[];
  @Input() newBoxId: string = "";
  @Output() deleteBoxesEvent = new EventEmitter<BoundingBoxModel[]>();
  @Output() addNewBoxEvent = new EventEmitter<string>();
  @Output() cancelNewBoxEvent = new EventEmitter<null>();
  @Output() selectClassEvent = new EventEmitter<string>();
  @Output() selectEvent = new EventEmitter<any>();

  private selectedBox: BoundingBoxModel;
  private expandedMap: Map<BoundingBoxModel, boolean> = null;
  private drewShape: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.expandedMap = new Map();
  }

  public getItemTitle(bb: BoundingBoxModel, i: number) {
    if (bb.id == this.newBoxId) {
      return "New Bounding Box";
    }

    let classValue = bb.classes.reduce(function (a, b) {
      return a.classValue > b.classValue ? a : b
    });
    return classValue.className + ": " + classValue.classValue.toFixed(NUMBER_OF_DECIMALS) + "%";
  }

  public getClassLabels(bb: BoundingBoxModel): string[] {
    let result = bb.classes.map((c: ClassValue) => c.className);
    return result;
  }

  public getClassValues(bb: BoundingBoxModel, index: number): String {
    return Number(bb.classes[index].classValue).toFixed(NUMBER_OF_DECIMALS);
  }

  public getMetadataValues(index: number): string {
    return this.metadataValues[index];
  }

  public setMetadataValues(index: number, event: any) {
    this.metadataValues[index] = event;
  }

  public getColor(bb: BoundingBoxModel): string {
    return bb.color;
  }

  private isEqual(bb1: BoundingBoxModel, bb2: BoundingBoxModel) {
    if (bb1 == null && bb2 == null) {
      return true;
    } else if (bb1 == null || bb2 == null) {
      return false;
    }
    return bb1.id == bb2.id;
  }

  public selectedBoxChanged(bb: BoundingBoxModel) {
    if (bb == null || !this.isEqual(bb, this.selectedBox)) {
      this.expandedMap.clear();
    }
    this.selectedBox = bb;
  }

  public isSelected(bb: BoundingBoxModel): boolean {
    if (this.isEqual(bb, this.selectedBox) || (!!this.expandedMap.get(bb) && this.expandedMap.get(bb).valueOf())) {
      return true;
    }
    return false;
  }

  public expanded(event, bb: BoundingBoxModel) {
    this.expandedMap.set(bb, event);
  }

  public confirmAllBoxes() {
    for (let i = 0; i < this.boundingBoxes.length; ++i) {
      this.selectEvent.emit({ id: this.boundingBoxes[i].id, className: "" });
    }
  }

  public deleteAllBoxes() {
    this.deleteBoxesEvent.emit(this.boundingBoxes);
  }

  public addNewBoundingBox() {
    this.addNewBoxEvent.emit(this.src);
  }

  public selectClass(index: number) {
    if (this.drewShape) {
      this.selectClassEvent.emit(this.classLabels[index]);
      this.drewShape = false;
    } else {
      alert("Draw a bounding box before selecting a classification.");
    }
  }

  public updateClass(bb: BoundingBoxModel, i: number) {
    this.selectEvent.emit({ id: bb.id, className: this.classLabels[i] });
  }

  public shapeDrawn(b: boolean) {
    this.drewShape = b;
  }

  public cancelNewBox() {
    this.cancelNewBoxEvent.emit();
  }

  public confirmBox(bb: BoundingBoxModel) {
    this.selectEvent.emit({ id: bb.id, className: "" });
  }

  public deleteBox(bb: BoundingBoxModel) {
    this.deleteBoxesEvent.emit([bb]);
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  public leaveFocus() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
