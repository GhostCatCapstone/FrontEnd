import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ghost-cat-login',
  templateUrl: './ghost-cat-login.component.html',
  styleUrls: ['./ghost-cat-login.component.css']
})
export class GhostCatLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
