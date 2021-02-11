import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExpandableListComponent, ExpandableListModule } from 'angular-expandable-list';
import { BoundingBoxModel } from 'src/app/Model/BoundingBoxModel';

const NUMBER_OF_DECIMALS: number = 3;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() src: string;
  @Input() animalLabels: string[];
  @Input() animalPercentages: string[];
  @Input() metadataLabels: string[];
  @Input() metadataValues: string[];
  @Input() boundingBoxes: BoundingBoxModel[];
  @Input() newBoxId: string = "";
  @Output() deleteBoxesEvent = new EventEmitter<BoundingBoxModel[]>();
  @Output() addNewBoxEvent = new EventEmitter<string>();
  @Output() cancelNewBoxEvent = new EventEmitter<null>();
  @Output() selectClassEvent = new EventEmitter<string>();
  @Output() confirmEvent = new EventEmitter<string>();

  private selectedBox: BoundingBoxModel;
  private expandedMap: Map<BoundingBoxModel, boolean> = null;
  private drewShape: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.expandedMap = new Map();
  }

  public getItemTitle(bb: BoundingBoxModel) {
    let labelArr: string[] = Object.keys(bb.classes);
    let valueArr: number[] = Object.values(bb.classes).map((s: string) => parseFloat(s));
    let maxIndex = valueArr.indexOf(Math.max(...valueArr));
    let number = (valueArr[maxIndex] * 100).toFixed(NUMBER_OF_DECIMALS);
    return labelArr[maxIndex] + ": " + number + "%";
  }

  public getColor(bb: BoundingBoxModel): string {
    return bb.color;
  }

  public getAnimalLabels(bb: BoundingBoxModel): string[] {
    let result = Object.keys(bb.classes);
    return result;
  }

  public getAnimalValues(bb: BoundingBoxModel): string[] {
    let valueArr: number[] = Object.values(bb.classes).map((s: string) => parseFloat(s));
    return valueArr.map((n: number) => (n * 100).toFixed(NUMBER_OF_DECIMALS) + "%");
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
      this.confirmEvent.emit(this.boundingBoxes[i].id);
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
      this.selectClassEvent.emit(this.animalLabels[index]);
      this.drewShape = false;
    } else {
      alert("Draw a bounding box before selecting a classification.");
    }
  }

  public shapeDrawn(b: boolean) {
    this.drewShape = b;
  }

  public cancelNewBox() {
    this.cancelNewBoxEvent.emit();
  }

  public confirmBox(bb: BoundingBoxModel) {
    this.confirmEvent.emit(bb.id);
  }

  public deleteBox(bb: BoundingBoxModel) {
    this.deleteBoxesEvent.emit([bb]);
  }

  public metadataChange(event: any) {
    console.log("Metadata changed");
  }

  public trackByFn(index: any, item: any) {
    return index;
  }
}
