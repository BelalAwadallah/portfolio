import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTrackingService, PortraitStage } from '../../../core/services/scroll-tracking.service';

@Component({
  selector: 'app-personal-portrait',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-portrait.component.html',
  styleUrl: './personal-portrait.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalPortraitComponent {
  private readonly scrollService = inject(ScrollTrackingService);

  readonly mode = input<'fixed' | 'inline'>('fixed');
  readonly cropVariant = input<'hero' | 'about' | 'compact'>('hero');
  readonly altText = input<string>('Belal Mahmoud — Frontend Developer');

  readonly isMobile = this.scrollService.isMobile;
  readonly portraitStage = this.scrollService.portraitStage;
  readonly prefersReducedMotion = this.scrollService.prefersReducedMotion;

  readonly transformStyle = computed(() => {
    if (this.mode() === 'inline' || this.isMobile() || this.prefersReducedMotion()) {
      return {};
    }

    const stage: PortraitStage = this.portraitStage();

    switch (stage) {
      case 'hero':
        return {
          left: '75vw',
          top: '50vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
          opacity: 1,
          pointerEvents: 'none'
        };
      case 'about':
        return {
          left: '25vw',
          top: '50vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(0.92, 0.92, 1)',
          opacity: 1,
          pointerEvents: 'none'
        };
      case 'services':
        return {
          left: '88vw',
          top: '25vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(0.65, 0.65, 1)',
          opacity: 0.85,
          pointerEvents: 'none'
        };
      case 'projects':
        return {
          left: '92vw',
          top: '50vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(0.45, 0.45, 1)',
          opacity: 0,
          pointerEvents: 'none'
        };
      case 'contact':
        return {
          left: '50vw',
          top: '50vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1)',
          opacity: 0.18,
          pointerEvents: 'none'
        };
      default:
        return {
          left: '75vw',
          top: '50vh',
          transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
          opacity: 1,
          pointerEvents: 'none'
        };
    }
  });
}
