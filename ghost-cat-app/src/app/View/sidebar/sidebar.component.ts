import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() animalLabels: string[];
  @Input() animalPercentages: string[];
  @Input() metadataLabels: string[];
  @Input() metadataValues: string[];

  constructor() { }

  ngOnInit(): void {
    console.log("Sidebar ngOnInit");
  }
}
