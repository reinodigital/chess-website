import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'social-media',
  imports: [],
  templateUrl: './social-media.html',
  styleUrl: './social-media.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SocialMedia {}
