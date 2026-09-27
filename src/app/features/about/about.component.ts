import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollTrackingService } from '../../core/services/scroll-tracking.service';
import { PersonalPortraitComponent } from '../../shared/components/personal-portrait/personal-portrait.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    PersonalPortraitComponent,
    ButtonModule,
    TagModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements AfterViewInit {
  readonly portfolioData = inject(PortfolioDataService);
  private readonly scrollService = inject(ScrollTrackingService);
  private readonly el = inject(ElementRef);

  readonly facts = this.portfolioData.educationFacts;
  readonly isMobile = this.scrollService.isMobile;

  ngAfterViewInit(): void {
    const aboutSection = this.el.nativeElement.querySelector('#about');
    if (aboutSection) {
      this.scrollService.registerSection(aboutSection);
    }

    const revealItems = this.el.nativeElement.querySelectorAll('.reveal-target');
    revealItems.forEach((item: HTMLElement) => {
      this.scrollService.registerRevealElement(item);
    });
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
