import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLiquidGlass]',
  standalone: true
})
export class LiquidGlassDirective implements OnInit, OnDestroy {
  @Input() glassVariant: 'clear' | 'maroon' = 'clear';
  @Input() proximityRadius: number = 130; // Radius in px around button where aura tracks cursor

  private cleanupMouseMove: (() => void) | null = null;
  private cleanupMouseLeave: (() => void) | null = null;
  private animFrameId: number | null = null;
  private targetButton: HTMLElement | null = null;
  private isBrowser: boolean;
  private wasActive: boolean = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Handled in ngAfterViewInit for full DOM availability
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Resolve actual interactive button element
    const host = this.el.nativeElement;
    this.targetButton = (host.tagName === 'P-BUTTON'
      ? host.querySelector('button') || host
      : host) as HTMLElement;

    // Apply base liquid glass styling classes ONLY to the actual button
    this.renderer.addClass(this.targetButton, 'liquid-glass-btn');
    if (this.glassVariant === 'maroon') {
      this.renderer.addClass(this.targetButton, 'liquid-glass-maroon');
    } else {
      this.renderer.addClass(this.targetButton, 'liquid-glass-clear');
    }

    // Ensure host p-button is completely transparent and does not clip the outer glowing aura
    if (host !== this.targetButton) {
      this.renderer.setStyle(host, 'overflow', 'visible');
      this.renderer.setStyle(host, 'position', 'relative');
      this.renderer.setStyle(host, 'display', 'inline-block');
      this.renderer.setStyle(host, 'background', 'transparent');
      this.renderer.setStyle(host, 'border', 'none');
      this.renderer.setStyle(host, 'box-shadow', 'none');
    }

    // Run cursor and proximity tracking outside Angular zone for 60fps performance without CD
    this.ngZone.runOutsideAngular(() => {
      this.initProximityTracking();
    });
  }

  private initProximityTracking(): void {
    if (!this.targetButton) return;

    let pendingEvent: MouseEvent | null = null;

    const onMouseMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (this.animFrameId === null) {
        this.animFrameId = requestAnimationFrame(() => {
          this.animFrameId = null;
          if (!pendingEvent || !this.targetButton) return;
          this.handleCursorMove(pendingEvent);
        });
      }
    };

    const onMouseLeave = () => {
      if (this.wasActive && this.targetButton) {
        const host = this.el.nativeElement;
        this.targetButton.style.setProperty('--liquid-opacity', '0');
        this.targetButton.classList.remove('liquid-active');
        if (host !== this.targetButton) {
          host.style.setProperty('--liquid-opacity', '0');
          host.classList.remove('liquid-active');
        }
        this.wasActive = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    this.cleanupMouseMove = () => window.removeEventListener('mousemove', onMouseMove);
    this.cleanupMouseLeave = () => document.removeEventListener('mouseleave', onMouseLeave);
  }

  private handleCursorMove(e: MouseEvent): void {
    if (!this.targetButton) return;

    const rect = this.targetButton.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Check if element is within current viewport
    if (
      rect.bottom < -100 ||
      rect.top > window.innerHeight + 100 ||
      rect.right < -100 ||
      rect.left > window.innerWidth + 100
    ) {
      if (this.wasActive) {
        const host = this.el.nativeElement;
        this.targetButton.style.setProperty('--liquid-opacity', '0');
        this.targetButton.classList.remove('liquid-active');
        if (host !== this.targetButton) {
          host.style.setProperty('--liquid-opacity', '0');
          host.classList.remove('liquid-active');
        }
        this.wasActive = false;
      }
      return;
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Closest point on the button perimeter
    const closestX = Math.max(rect.left, Math.min(mouseX, rect.right));
    const closestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));

    const distX = mouseX - closestX;
    const distY = mouseY - closestY;
    const distance = Math.hypot(distX, distY);

    const host = this.el.nativeElement;

    if (distance <= this.proximityRadius) {
      // Smooth optical falloff curve
      const factor = 1 - distance / this.proximityRadius;
      const opacity = Math.pow(factor, 1.3);

      // Relative coordinates from button top-left
      const relX = mouseX - rect.left;
      const relY = mouseY - rect.top;

      this.targetButton.style.setProperty('--mouse-x', `${relX.toFixed(1)}px`);
      this.targetButton.style.setProperty('--mouse-y', `${relY.toFixed(1)}px`);
      this.targetButton.style.setProperty('--liquid-opacity', opacity.toFixed(3));

      if (host !== this.targetButton) {
        host.style.setProperty('--mouse-x', `${relX.toFixed(1)}px`);
        host.style.setProperty('--mouse-y', `${relY.toFixed(1)}px`);
        host.style.setProperty('--liquid-opacity', opacity.toFixed(3));
      }

      if (!this.wasActive) {
        this.targetButton.classList.add('liquid-active');
        if (host !== this.targetButton) host.classList.add('liquid-active');
        this.wasActive = true;
      }
    } else {
      if (this.wasActive) {
        this.targetButton.style.setProperty('--liquid-opacity', '0');
        this.targetButton.classList.remove('liquid-active');
        if (host !== this.targetButton) {
          host.style.setProperty('--liquid-opacity', '0');
          host.classList.remove('liquid-active');
        }
        this.wasActive = false;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.cleanupMouseMove) {
      this.cleanupMouseMove();
    }
    if (this.cleanupMouseLeave) {
      this.cleanupMouseLeave();
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}
