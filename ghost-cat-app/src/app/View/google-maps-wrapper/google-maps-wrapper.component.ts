import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraLocation } from 'src/app/Model/CameraLocation';

@Component({
  selector: 'app-google-maps-wrapper',
  templateUrl: './google-maps-wrapper.component.html',
  styleUrls: ['./google-maps-wrapper.component.css'],
})
export class GoogleMapsWrapperComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() cameraLocations: CameraLocation[];

  @Output() cameraSiteClicked = new EventEmitter<CameraLocation>();

  constructor() {}

  ngOnInit(): void {}

  public clickedMarker(camera: CameraLocation) {
    this.cameraSiteClicked.emit(camera);
  }
}
