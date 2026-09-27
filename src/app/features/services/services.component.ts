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
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    CardModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements AfterViewInit {
  readonly portfolioData = inject(PortfolioDataService);
  private readonly scrollService = inject(ScrollTrackingService);
  private readonly el = inject(ElementRef);

  readonly services = this.portfolioData.services;

  ngAfterViewInit(): void {
    const servicesSection = this.el.nativeElement.querySelector('#services');
    if (servicesSection) {
      this.scrollService.registerSection(servicesSection);
    }

    const revealCards = this.el.nativeElement.querySelectorAll('.service-card');
    revealCards.forEach((card: HTMLElement) => {
      this.scrollService.registerRevealElement(card);
    });
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
