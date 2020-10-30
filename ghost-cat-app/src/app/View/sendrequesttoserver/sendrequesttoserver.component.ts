import { Component, OnInit } from '@angular/core';
import { ServerFacade } from '../../Proxy/ServerFacade';

@Component({
  selector: 'app-sendrequesttoserver',
  templateUrl: './sendrequesttoserver.component.html',
  styleUrls: ['./sendrequesttoserver.component.css'],
})
export class SendrequesttoserverComponent implements OnInit {
  constructor(private server: ServerFacade) {}

  ngOnInit(): void {}

  public sendRequest(event: Event): void {
    this.server.getImages(null, null, null, null);
  }
}
