import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly isDark = this.themeService.isDark;

  // Optional variant: 'icon-only' for compact nav or 'pill' with text
  readonly variant = input<'icon' | 'pill'>('icon');

  toggle(): void {
    this.themeService.toggleTheme();
  }
}
