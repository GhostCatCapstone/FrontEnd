import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(private router: Router) {}

  private searchByAnimal: boolean;
  private searchByCamera: boolean;
  private searchByDate: boolean;

  ngOnInit(): void {
    this.searchByAnimal = false;
    this.searchByCamera = false;
    this.searchByDate = false;
  }

  enterSearch(): void {
    const animal: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('Animal')
    );
    const animalType: string = (<HTMLInputElement>(
      document.getElementById('AnimalValue')
    )).value;
    const confidenceLevel: number =
      parseInt(
        (<HTMLInputElement>document.getElementById('ConfidenceLevel')).value
      ) / 100;

    const camera: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('Camera')
    );
    const cameraTrap: string = (<HTMLInputElement>(
      document.getElementById('CameraTrap')
    )).value;

    const date: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('Date')
    );
    const firstDate: Date = new Date(
      (<HTMLInputElement>document.getElementById('FirstDate')).value
    );

    const dateType: string = (<HTMLSelectElement>(
      document.getElementById('DateType')
    )).value;

    const secondDate: Date | null = new Date(
      (<HTMLInputElement>document.getElementById('SecondDate')).value
    );

    this.router.navigate(['thumbnails'], {
      state: {
        searchParameters: {
          searchByAnimal: animal.checked,
          animalType: animalType,
          confidenceLevel: confidenceLevel,
          searchByCamera: camera.checked,
          cameraTrap: cameraTrap,
          searchByDate: date.checked,
          dateType: dateType,
          firstDate: firstDate.getTime(),
          secondDate: secondDate?.getTime(),
        },
      },
    });
  }
}
