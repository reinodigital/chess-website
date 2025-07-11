import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button-dropdown',
  imports: [CommonModule],
  templateUrl: './button-dropdown.html',
  styleUrl: './button-dropdown.scss',
  host: {
    // modern approach to handle HostListener
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class ButtonDropdown {
  private elementRef = inject(ElementRef);

  buttonTitle = input.required<string>();
  actionsLabels = input.required<string[]>();
  actionsMethods = input.required<(() => void)[]>();
  actionsChecked = input.required<boolean[]>();

  protected isMenuVisible = signal<boolean>(false);

  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuVisible.set(false);
    }
  }
}
