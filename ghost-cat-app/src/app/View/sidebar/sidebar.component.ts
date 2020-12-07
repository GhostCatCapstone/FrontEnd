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
  @Input() animalLabels: string[];
  @Input() animalPercentages: string[];
  @Input() metadataLabels: string[];
  @Input() metadataValues: string[];
  @Input() boundingBoxes: BoundingBoxModel[];
  private selectedBox: BoundingBoxModel;
  private expandedMap: Map<BoundingBoxModel, boolean> = null;

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

  private checkIfEqual(bb1: BoundingBoxModel, bb2: BoundingBoxModel): boolean {
    if (bb1 == null && bb2 == null) {
      return true;
    }
    if (bb1 == null || bb2 == null) {
      return false;
    }
    if (bb1.id == bb2.id && bb1.imgId == bb2.imgId && bb1.xVal == bb2.xVal && bb1.yVal == bb2.yVal && bb1.height == bb2.height && bb1.width == bb2.width && bb1.classes == bb2.classes && bb1.color == bb2.color) {
      return true;
    }
    return false;
  }

  public selectedBoxChanged(bb: BoundingBoxModel) {
    if (bb == null || bb != this.selectedBox) {
      this.expandedMap.clear();
    }
    this.selectedBox = bb;
  }

  public isSelected(bb: BoundingBoxModel): boolean {
    if (this.checkIfEqual(bb, this.selectedBox) || (!!this.expandedMap.get(bb) && this.expandedMap.get(bb).valueOf())) {
      return true;
    }
    return false;
  }

  public expanded(event, bb: BoundingBoxModel) {
    this.expandedMap.set(bb, event);
  }
}
