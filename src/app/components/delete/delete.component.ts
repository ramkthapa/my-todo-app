import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {CreateUpdateComponent} from '../create-update/create-update.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

}
