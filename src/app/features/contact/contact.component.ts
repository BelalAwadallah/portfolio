import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  AfterViewInit,
  signal,
  computed
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
  readonly isDraftPrepared = signal<boolean>(false);
  readonly isDraftCopied = signal<boolean>(false);

  /**
   * Reactive mailto URL synchronized with the DOM.
   * Automatically encodes subject=Inquiry and the body parameter.
   */
  readonly mailtoUrl = computed(() => {
    const email = this.email;
    const brief = this.projectBrief().trim();
    const name = this.senderName().trim();

    // Default to clean mailto when no message or draft intent exists
    if (!brief && !name && !this.isDraftPrepared()) {
      return `mailto:${email}`;
    }

    const subject = 'Inquiry';
    const body = brief || 'Hello Belal, I would like to discuss a frontend project.';
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

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

  sendMailto(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    // Activate in-page confirmation & preview state
    this.isDraftPrepared.set(true);

    // Concurrently trigger opening email client without navigating away or clearing inputs
    if (typeof window !== 'undefined') {
      const mailAnchor = document.createElement('a');
      mailAnchor.href = this.mailtoUrl();
      mailAnchor.rel = 'noopener noreferrer';
      mailAnchor.click();
    }
  }

  copyDraftToClipboard(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const subject = 'Inquiry';
      const body = this.projectBrief().trim() || 'Hello Belal, I would like to discuss a frontend project.';
      const formatted = `To: ${this.email}\nSubject: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(formatted).then(() => {
        this.isDraftCopied.set(true);
        setTimeout(() => this.isDraftCopied.set(false), 2500);
      });
    }
  }

  resetDraft(): void {
    this.isDraftPrepared.set(false);
  }

  scrollToTop(): void {
    this.scrollService.scrollToSection('home');
  }
}
