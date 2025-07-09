import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  signal,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.html',
  styleUrls: ['./modal-confirm.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModalConfirm {
  public dialogRef = inject(MatDialogRef<ModalConfirm>);

  public data = signal<string>('');

  constructor(@Inject(MAT_DIALOG_DATA) public message: string) {
    this.data.set(message);
  }

  closePopUp(e: string) {
    this.dialogRef.close(e === 'continue'); // this close dialog and emit the value was clicked
  }
}
