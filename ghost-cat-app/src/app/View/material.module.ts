import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { GALLERY_CONFIG } from 'ng-gallery';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  exports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: false,
        imageSize: 'cover',
      },
    },
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
