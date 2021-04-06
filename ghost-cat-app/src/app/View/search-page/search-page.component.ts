import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraLocation } from 'src/app/Model/CameraLocation';
import { GetProjectDataRequest } from 'src/app/Model/GetProjectDataRequest';
import { GetProjectDataResponse } from 'src/app/Model/GetProjectDataResponse';
import { ServerFacade } from 'src/app/Proxy/ServerFacade';
import { AuthorizationService } from "../../Auth/authorization.service";
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(private router: Router, private auth: AuthorizationService, private server: ServerFacade,) { }

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
  public temp: string[];
  public projects: string[];
  public selectedProject: string;

  ngOnInit(): void {
    //console.log("On search page\n");
    this.searchByAnimal = false;
    this.searchByCamera = false;
    this.searchByDate = false;
    this.cameraTrapsSelected = [];
    // TODO: get classes and camera trap information from database
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

    var username = this.auth.getUserName();
    const getProjectDataRequest: GetProjectDataRequest = new GetProjectDataRequest(
      username,
    )

    this.server
      .getProjectData(getProjectDataRequest)
      .pipe(catchError(this.server.handleError('getProjectData')))
      .subscribe((response: GetProjectDataResponse) => {
        if (response.success && response.projects.length) {
          this.projects = response.projects.map((p) => p.projectID);
        }
      })
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
          project : this.selectedProject,
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.enterSearch();
    }
  }

  public async logout(): Promise<void> {
    //console.log("About to call logout function\n");
    this.auth.logout();
    this.router.navigate([`/login`]);
  }

  public updateCameraSite(cameraSite: CameraLocation): void {
    if (this.cameraTrapsSelected.includes(cameraSite.label)) {
      this.cameraTrapsSelected = this.cameraTrapsSelected.filter(trap => trap != cameraSite.label);
    } else {
      this.cameraTrapsSelected = [...this.cameraTrapsSelected, cameraSite.label];
    }
  }
}
