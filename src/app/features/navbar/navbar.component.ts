import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTrackingService } from '../../core/services/scroll-tracking.service';
import { ButtonModule } from 'primeng/button';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

interface NavItem {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly scrollService = inject(ScrollTrackingService);

  readonly isMenuOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);
  readonly activeSection = this.scrollService.activeSection;

  readonly navItems: readonly NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  toggleMenu(): void {
    const nextState = !this.isMenuOpen();
    this.isMenuOpen.set(nextState);
    if (typeof document !== 'undefined') {
      if (nextState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  navigateTo(sectionId: string): void {
    this.closeMenu();
    this.scrollService.scrollToSection(sectionId);
  }
}
