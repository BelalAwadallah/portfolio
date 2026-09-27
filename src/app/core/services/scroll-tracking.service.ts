import { Injectable, signal, NgZone, inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type PortraitStage = 'hero' | 'about' | 'services' | 'projects' | 'contact';

export interface PortraitTransform {
  left: string;
  top: string;
  scale: number;
  opacity: number;
  blur?: string;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollTrackingService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeSection = signal<string>('home');
  readonly portraitStage = signal<PortraitStage>('hero');
  readonly isMobile = signal<boolean>(false);
  readonly prefersReducedMotion = signal<boolean>(false);

  private sectionObserver: IntersectionObserver | null = null;
  private revealObserver: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkViewport();
      this.checkReducedMotion();
      this.initIntersectionObservers();
      this.bindWindowEvents();
    }
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth < 1024);
    }
  }

  private checkReducedMotion(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion.set(mediaQuery.matches);
      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion.set(e.matches);
      });
    }
  }

  private bindWindowEvents(): void {
    const handleResize = () => {
      this.checkViewport();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', handleResize);
      this.disconnectObservers();
    });
  }

  private initIntersectionObservers(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      // Observer for tracking active section and portrait stage
      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              if (id) {
                this.ngZone.run(() => {
                  this.activeSection.set(id);
                  if (id === 'home') {
                    this.portraitStage.set('hero');
                  } else if (id === 'about') {
                    this.portraitStage.set('about');
                  } else if (id === 'services') {
                    this.portraitStage.set('services');
                  } else if (id === 'projects') {
                    this.portraitStage.set('projects');
                  } else if (id === 'contact') {
                    this.portraitStage.set('contact');
                  }
                });
              }
            }
          }
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0
        }
      );

      // Observer for card scroll-reveal system
      this.revealObserver = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          }
        },
        {
          rootMargin: '0px 0px -80px 0px',
          threshold: 0.1
        }
      );
    });
  }

  /**
   * Observe sections for active navigation and portrait movement
   */
  registerSection(element: HTMLElement): void {
    if (this.sectionObserver) {
      this.sectionObserver.observe(element);
    }
  }

  /**
   * Observe cards and items for the one-time scroll reveal animation
   */
  registerRevealElement(element: HTMLElement): void {
    if (this.prefersReducedMotion()) {
      element.classList.add('is-revealed');
      return;
    }

    if (this.revealObserver) {
      this.revealObserver.observe(element);
    } else {
      element.classList.add('is-revealed');
    }
  }

  scrollToSection(sectionId: string): void {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private disconnectObservers(): void {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
    if (this.revealObserver) {
      this.revealObserver.disconnect();
      this.revealObserver = null;
    }
  }
}
