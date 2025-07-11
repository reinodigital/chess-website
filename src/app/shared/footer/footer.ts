import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SocialMedia } from '../components/social-media/social-media';

@Component({
  selector: 'footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  imports: [RouterLink, SocialMedia],
})
export class Footer {}
