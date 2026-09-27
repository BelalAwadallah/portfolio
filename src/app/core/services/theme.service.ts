import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'belal_portfolio_theme';

  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.theme(), false);

    // Watch for theme changes and persist + update DOM
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme, true);
    });
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, nextTheme);
    }
  }

  setTheme(newTheme: ThemeMode): void {
    this.theme.set(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, newTheme);
    }
  }

  private getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'light';
    }

    try {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Fallback in environments without localStorage
    }

    // Default to Light mode on first visit
    return 'light';
  }

  private applyTheme(theme: ThemeMode, withTransition: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    if (withTransition) {
      root.classList.add('theme-transitioning');
    }

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update browser theme-color meta tag for seamless UI bar color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const colorHex = theme === 'dark' ? '#0C0C0E' : '#F7F4F2';
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colorHex);
    }

    if (withTransition) {
      window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 450);
    }
  }
}
