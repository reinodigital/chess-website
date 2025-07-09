import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'custom-toast',
  standalone: true,
  templateUrl: './custom-toast.html',
  styleUrl: './custom-toast.scss',
  host: {
    class: 'toast_fixed',
  },
})
export class CustomToast {
  public toastService = inject(CustomToastService);

  removeToast(index: number) {
    this.toastService.remove(index);
  }
}
