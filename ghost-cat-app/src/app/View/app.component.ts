import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ghost-cat-app';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '800px',
      data: {
        url: "https://www.ngi.org.uk/wp-content/uploads/2016/08/The-four-otters-from-left-Ash-Tod-Pip-and-Sam-Copyright-Ian-Greneholt.jpg",
        metadataList: ["Camera Trap Name: site002", "Date: 01/01/2020", "Camera make: CUDDEBACK", "Camera model: Ambush"],
        animalList: ["Mule deer: 83%", "Cow: 0.1%"]
      }
    });
  }
}
