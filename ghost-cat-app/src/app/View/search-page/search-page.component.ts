import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraLocation } from 'src/app/Model/CameraLocation';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(private router: Router) {}

  public searchByAnimal: boolean;
  public searchByCamera: boolean;
  public searchByDate: boolean;
  public classChoice: string;
  public cameraTrap: string;
  public cameraTrapsSelected: string[];
  public dateType: string;
  public firstDate: Date;
  public secondDate: Date;
  public classes: string[];
  public cameraTraps: string[];
  public selectedView: string;
  public cameraLocations: CameraLocation[];

  ngOnInit(): void {
    this.searchByAnimal = false;
    this.searchByCamera = false;
    this.searchByDate = false;
    this.cameraTrapsSelected = [];
    this.classes = ['Mule Deer', 'Cow', 'Sheep', 'Other'];
    this.cameraTraps = ['site002', 'site004', 'site005', 'site006', 'site008'];
    this.selectedView = 'thumbnails';
    this.cameraLocations = [
      new CameraLocation('site002', 40.77956, -110.37389),
      new CameraLocation('site004', 40.77956, -110.47389),
      new CameraLocation('site005', 40.77956, -110.57389),
      new CameraLocation('site006', 40.77956, -110.67389),
      new CameraLocation('site008', 40.77956, -110.77389),
    ];
    for(let i = 0; i < this.cameraTrapsSelected.length; i++){
      alert("Current Cameras selected " + this.cameraTrapsSelected[i] + "\n");
    }
  }

  checkedCameras(value) {
    //this function is called to select or deselect individual camera check boxes and adjust the final search array(cameraTrapsSelected) accordingly
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
        this.cameraTrapsSelected.push(value);
        (<HTMLInputElement>document.getElementById("Remove_All")).checked = false;
        (<HTMLInputElement>document.getElementById("Select_All")).checked = false;
    }
    else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
        let indexx = this.cameraTrapsSelected.indexOf(value);
        this.cameraTrapsSelected.splice(indexx,1);
        (<HTMLInputElement>document.getElementById("Remove_All")).checked = false;
        (<HTMLInputElement>document.getElementById("Select_All")).checked = false;
    }
  }

  bulk(a) {
    //this function is called to select or deselect all camera check boxes and adjust the final search array(cameraTrapsSelected) accordingly
    if (a == "all") {
        console.log("yes all");
        this.cameraTrapsSelected = [];
        for (let i = 0; i < this.cameraTraps.length; i++) {
            (<HTMLInputElement>document.getElementsByClassName("checkedCamera")[i]).checked = true;
            (<HTMLInputElement>document.getElementById("Remove_All")).checked = false;
            this.cameraTrapsSelected.push(this.cameraTraps[i]);
        }
    }
    if (a == "none") {
        for (let i = 0; i < this.cameraTraps.length; i++) {
            (<HTMLInputElement>document.getElementsByClassName("checkedCamera")[i]).checked = false;
            (<HTMLInputElement>document.getElementById("Select_All")).checked = false;
        }
        this.cameraTrapsSelected = [];
    }
  }


  enterSearch(): void {
    const confidenceLevel: number = this.searchByAnimal
      ? parseInt(
          (<HTMLInputElement>document.getElementById('ConfidenceLevel')).value
        ) / 100
      : 0;

    this.router.navigate([this.selectedView], {
      state: {
        searchParameters: {
          searchByAnimal: this.searchByAnimal,
          animalType: this.classChoice,
          confidenceLevel: confidenceLevel,
          searchByCamera: this.searchByCamera,
          cameraTrap: this.cameraTrapsSelected,
          searchByDate: this.searchByDate,
          dateType: this.dateType,
          firstDate: this.firstDate?.getTime(),
          secondDate: this.secondDate?.getTime(),
        },
      },
    });
  }

  public updateCameraSite(cameraSite: CameraLocation): void {
    this.cameraTrap = cameraSite.label;
  }
}
