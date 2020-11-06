import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input() src: string;
  @Input() description: string;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.src);
    console.log("image details has been called");
  }

}
