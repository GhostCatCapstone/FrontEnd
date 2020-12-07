import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  animalCheck() {
    var checkBox = document.getElementById("Animal");
    var animals = document.getElementById("animals");
    var percents = document.getElementById("percents");
    if ((<HTMLInputElement>checkBox).checked == true){
      animals.style.display = "block";
      percents.style.display = "block";
    } else {
      animals.style.display = "none";
      percents.style.display = "none";
    }
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
