import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataInfo {
  isDataArray: boolean;
  data: string;
  header: string;
}

@Component({
  selector: 'modal-data-info',
  templateUrl: './modal-data-info.html',
  styleUrls: ['./modal-data-info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class ModalDataInfo implements OnInit {
  public dialogRef = inject(MatDialogRef<ModalDataInfo>);

  public dataModal = signal<DataInfo | null>(null);
  public dataArray = signal<string[]>([]);
  public dataString = signal<string>('');
  public header = signal<string | null>('');

  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: DataInfo) {
    this.dataModal.set(dataPassed);
  }

  ngOnInit(): void {
    if (this.dataModal()) {
      this.dataModal()!.isDataArray
        ? this.dataArray.set(this.dataModal()!.data.split(','))
        : this.dataString.set(this.dataModal()!.data);

      this.header.set(this.dataModal()!.header);
    }
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
