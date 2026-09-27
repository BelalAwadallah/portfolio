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
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, DividerModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements AfterViewInit {
  readonly portfolioData = inject(PortfolioDataService);
  private readonly scrollService = inject(ScrollTrackingService);
  private readonly el = inject(ElementRef);

  readonly projects = this.portfolioData.projects;

  ngAfterViewInit(): void {
    const projectsSection = this.el.nativeElement.querySelector('#projects');
    if (projectsSection) {
      this.scrollService.registerSection(projectsSection);
    }
  }
}
