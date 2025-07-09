import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-image',
  templateUrl: './modal-image.html',
  styleUrls: ['./modal-image.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModalImage {
  public dialogRef = inject(MatDialogRef<ModalImage>);

  public imgUrl = signal<string>('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.imgUrl.set(data);
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
