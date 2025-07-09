import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  public renderer = inject(Renderer2);
  public el = inject(ElementRef);

  // MOBILE NAV
  public isMenuOpen = signal<boolean>(false);

  // Mobile Navigation
  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMobileNavbar(): void {
    this.isMenuOpen.set(false);
  }
}
