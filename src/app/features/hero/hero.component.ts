import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollTrackingService } from '../../core/services/scroll-tracking.service';
import { FloatingPathsComponent } from '../../shared/components/floating-paths/floating-paths.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { LiquidGlassDirective } from '../../shared/directives/liquid-glass.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    FloatingPathsComponent,
    LiquidGlassDirective,
    ButtonModule,
    TagModule,
    ChipModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly portfolioData = inject(PortfolioDataService);
  private readonly scrollService = inject(ScrollTrackingService);
  private readonly el = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  readonly stats = this.portfolioData.stats;
  readonly techStack = this.portfolioData.techStack;
  readonly isMobile = this.scrollService.isMobile;

  private rafId: number | null = null;
  private ticking = false;
  private portraitEl: HTMLElement | null = null;
  private heroEl: HTMLElement | null = null;

  ngAfterViewInit(): void {
    const heroSection = this.el.nativeElement.querySelector('#home');
    if (heroSection) {
      this.scrollService.registerSection(heroSection);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.portraitEl = this.el.nativeElement.querySelector('.hero-portrait-img');
          this.heroEl = this.el.nativeElement.querySelector('#home');

          if (this.portraitEl && this.heroEl) {
            // Listen on both window AND document to cover all scroll containers
            window.addEventListener('scroll', this.onScroll, { passive: true });
            document.addEventListener('scroll', this.onScroll, { passive: true });
          }
        }, 200);
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      document.removeEventListener('scroll', this.onScroll);
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
    }
  }

  private onScroll = (): void => {
    if (!this.ticking) {
      this.rafId = requestAnimationFrame(this.applyParallax);
      this.ticking = true;
    }
  };

  private applyParallax = (): void => {
    this.ticking = false;
    if (!this.portraitEl || !this.heroEl) return;

    // getBoundingClientRect works regardless of scroll container
    const rect = this.heroEl.getBoundingClientRect();

    // scrolledAmount = how much of the hero has scrolled past the top (0 at start → positive as you scroll)
    const scrolledAmount = -rect.top;
    if (scrolledAmount < 0) return; // Hero hasn't started scrolling yet

    const progress = Math.min(1, scrolledAmount / rect.height);

    // translateY: 0px → -120px (moves up more visibly)
    // scale: 1.0 → 1.12 (noticeable zoom in)
    const translateY = -(progress * 120);
    const scale = 1 + progress * 0.12;

    this.portraitEl.style.transform = `translateY(${translateY}px) scale(${scale})`;
  };

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
