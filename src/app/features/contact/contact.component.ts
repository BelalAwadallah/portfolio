import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  AfterViewInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollTrackingService } from '../../core/services/scroll-tracking.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements AfterViewInit {
  readonly portfolioData = inject(PortfolioDataService);
  private readonly scrollService = inject(ScrollTrackingService);
  private readonly el = inject(ElementRef);

  readonly email = this.portfolioData.email;
  readonly phone = this.portfolioData.phone;
  readonly phoneFormatted = this.portfolioData.phoneFormatted;
  readonly linkedinUrl = this.portfolioData.linkedinUrl;
  readonly githubUrl = this.portfolioData.githubUrl;

  readonly senderName = signal<string>('');
  readonly senderEmail = signal<string>('');
  readonly projectBrief = signal<string>('');
  readonly isCopied = signal<boolean>(false);

  ngAfterViewInit(): void {
    const contactSection = this.el.nativeElement.querySelector('#contact');
    if (contactSection) {
      this.scrollService.registerSection(contactSection);
    }
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.email).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2500);
      });
    }
  }

  sendMailto(): void {
    const name = encodeURIComponent(this.senderName() || 'Colleague / Client');
    const brief = encodeURIComponent(this.projectBrief() || 'Hello Belal, I would like to discuss a frontend opportunity.');
    const mailtoUrl = `mailto:${this.email}?subject=Project%20Inquiry%20from%20${name}&body=${brief}`;
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }
  }

  scrollToTop(): void {
    this.scrollService.scrollToSection('home');
  }
}
