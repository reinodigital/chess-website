import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'submit-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './submit-button.html',
  styleUrls: ['./submit-button.scss'],
  standalone: true,
})
export class SubmitButton {
  public isFormSubmitting = input<boolean>();
  public attributeName = input<string | null>(null);
  public attributeClass = input<string | null>(null);
  public primaryText = input<string>();
  public secondaryText = input<string>();
}
