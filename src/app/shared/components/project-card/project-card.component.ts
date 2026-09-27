import {
  Component,
  ChangeDetectionStrategy,
  input,
  ElementRef,
  inject,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { ScrollTrackingService } from '../../../core/services/scroll-tracking.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TagModule, ButtonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements AfterViewInit {
  readonly project = input.required<Project>();
  readonly isReversed = input<boolean>(false);

  private readonly el = inject(ElementRef);
  private readonly scrollService = inject(ScrollTrackingService);

  ngAfterViewInit(): void {
    const cardEl = this.el.nativeElement.querySelector('.project-case-study');
    if (cardEl) {
      this.scrollService.registerRevealElement(cardEl);
    }
  }
}
