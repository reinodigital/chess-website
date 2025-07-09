import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomToast } from './shared/components/custom-toast/custom-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomToast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'We Chess';
}
