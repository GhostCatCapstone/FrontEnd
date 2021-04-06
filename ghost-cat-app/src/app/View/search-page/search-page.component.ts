import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraLocation } from 'src/app/Model/CameraLocation';
import { GetProjectDataRequest } from 'src/app/Model/GetProjectDataRequest';
import { GetProjectDataResponse } from 'src/app/Model/GetProjectDataResponse';
import { ServerFacade } from 'src/app/Proxy/ServerFacade';
import { AuthorizationService } from "../../Auth/authorization.service";
import { catchError } from 'rxjs/operators'
import { GetCameraTrapsRequest } from 'src/app/Model/GetCameraTrapRequest';
import { GetCameraTrapsResponse } from 'src/app/Model/GetCameraTrapResponse';
import { ProjectData } from 'src/app/Model/ProjectData';

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
  private allProjectData: ProjectData[];

  ngOnInit(): void {
    //console.log("On search page\n");
    this.searchByAnimal = false;
    this.searchByCamera = false;
    this.searchByDate = false;
    this.cameraTrapsSelected = [];
    this.selectedView = 'thumbnails';

    var username = this.auth.getUserName();
    const getProjectDataRequest: GetProjectDataRequest = new GetProjectDataRequest(
      username,
    );

    this.server
      .getProjectData(getProjectDataRequest)
      .pipe(catchError(this.server.handleError('getProjectData')))
      .subscribe((response: GetProjectDataResponse) => {
        if (response.success && response.projects.length) {
          this.allProjectData = response.projects;
          this.projects = response.projects.map((p) => p.projectID);
        }
      });
  }

  projectChosen(selectedProject: any) {
    var username = this.auth.getUserName();
    const getCameraTrapsRequest: GetCameraTrapsRequest = new GetCameraTrapsRequest(selectedProject, username);

    this.server.getCameraTraps(getCameraTrapsRequest).pipe(catchError(this.server.handleError('getCameraTraps'))).subscribe((response: GetCameraTrapsResponse) => {
      if (response.success && response.cameraTraps.length) {
        this.cameraTraps = response.cameraTraps.map((trap) => trap.cameraTrapID);
        this.cameraLocations = response.cameraTraps.map((trap) => new CameraLocation(trap.cameraTrapID, trap.lat, trap.lng));

        this.classes = this.allProjectData.filter((data) => data.projectID == selectedProject)[0].classes;
      }
    });
  }

  enterSearch(): void {
    const confidenceLevel: number = this.searchByAnimal
      ? parseInt(
        (<HTMLInputElement>document.getElementById('ConfidenceLevel')).value
      ) : 0;

    if (this.selectedProject == null) {
      alert("Please select a Project to search from");
    }

    this.router.navigate([this.selectedView], {
      state: {
        searchParameters: {
          project: this.selectedProject,
          searchByAnimal: this.searchByAnimal,
          animalType: this.classChoice,
          confidenceLevel: confidenceLevel,
          searchByCamera: this.searchByCamera,
          cameraTraps: this.cameraTrapsSelected,
          searchByDate: this.searchByDate,
          dateType: this.dateType,
          firstDate: this.firstDate?.getTime(),
          secondDate: this.secondDate?.getTime(),
          classes: this.classes,
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
