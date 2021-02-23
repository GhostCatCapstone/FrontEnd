import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CameraLocation } from 'src/app/Model/CameraLocation';

@Component({
  selector: 'app-google-maps-wrapper',
  templateUrl: './google-maps-wrapper.component.html',
  styleUrls: ['./google-maps-wrapper.component.css'],
})
export class GoogleMapsWrapperComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() cameraLocations: CameraLocation[];

  constructor() {}

  ngOnInit(): void {}
}
