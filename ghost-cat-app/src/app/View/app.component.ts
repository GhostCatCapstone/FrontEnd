import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router) { }

  title = 'ghost-cat-app';

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    this.goToPage("login");
  }
}
