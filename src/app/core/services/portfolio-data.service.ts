import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import { Service } from '../models/service.model';
import { Stat } from '../models/stat.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  readonly developerName = 'Belal Mahmoud';
  readonly fullName = 'Belal Mohamed Mahmoud';
  readonly professionalTitle = 'Frontend Developer';
  readonly specialization = 'Angular · React · TypeScript';
  readonly location = 'Egypt';
  readonly availability = 'Open to freelance projects and full-time opportunities';

  readonly email = 'belalawadallah891@gmail.com';
  readonly phone = '+20 109 616 2788';
  readonly phoneFormatted = '+20 109 616 2788';
  readonly linkedinUrl = 'https://www.linkedin.com/in/belal-awadallah-3213b1288/';
  readonly githubUrl = 'https://github.com/BelalAwadallah';

  readonly stats = signal<readonly Stat[]>([
    {
      id: 1,
      value: '10+',
      label: 'Projects delivered',
      detail: 'Production-ready web applications'
    },
    {
      id: 2,
      value: '500+',
      label: 'Training hours completed',
      detail: 'Advanced Angular & frontend engineering'
    },
    {
      id: 3,
      value: 'Excellent',
      label: 'B.Sc. IT — With Honors',
      detail: 'Delta University for Science and Technology'
    }
  ]);

  readonly techStack = signal<readonly string[]>([
    'Angular',
    'React',
    'TypeScript',
    'RxJS',
    'Tailwind CSS',
    'Figma'
  ]);

  readonly services = signal<readonly Service[]>([
    {
      id: 1,
      number: '01',
      title: 'Frontend Development',
      description: 'Building responsive, production-grade web applications with Angular (v17+/v20) and React using component-based architecture and reactive state management.',
      icon: 'pi pi-code',
      tags: ['Angular 21+', 'React', 'TypeScript', 'Component Architecture']
    },
    {
      id: 2,
      number: '02',
      title: 'Figma-to-Code',
      description: 'Translating Figma designs into pixel-accurate, responsive interfaces using Tailwind CSS and PrimeNG with a disciplined design-first workflow.',
      icon: 'pi pi-palette',
      tags: ['Tailwind CSS', 'PrimeNG', 'Design Systems', 'Responsive UI']
    },
    {
      id: 3,
      number: '03',
      title: 'Performance & Architecture',
      description: 'Optimizing real-world applications with lazy loading, OnPush change detection, and RxJS pipelines such as debounceTime, switchMap, and shareReplay.',
      icon: 'pi pi-bolt',
      tags: ['OnPush', 'RxJS Pipelines', 'Lazy Loading', 'Bundle Optimization']
    },
    {
      id: 4,
      number: '04',
      title: 'Dashboards & Role-Based Systems',
      description: 'Architecting multi-role platforms with RBAC, route guards, reusable components, and structured frontend architecture for reliable operations.',
      icon: 'pi pi-shield',
      tags: ['RBAC Systems', 'Route Guards', 'Admin Dashboards', 'Modular Clean Code']
    }
  ]);

  readonly projects = signal<readonly Project[]>([
    {
      id: 1,
      number: '01',
      title: 'University Management Platform',
      category: 'Enterprise Web Application',
      description: 'A multi-role university platform designed around structured navigation, reusable UI patterns, role-based access control, and reactive data flows.',
      stack: ['Angular 17+', 'PrimeNG', 'Tailwind CSS', 'RESTful APIs'],
      metrics: [
        '~40% reduction in redundant HTTP traffic',
        '~70% unit test coverage on core services',
        'Lazy-loaded feature areas for fast initial bundle',
        'Multi-role RBAC architecture (student / instructor / admin)'
      ],
      githubUrl: 'https://github.com/BelalAwadallah',
      architectureHighlights: [
        'Reactive authentication guards preventing unauthorized module downloads',
        'Custom themed PrimeNG data tables with pagination and column filtering',
        'RxJS cache operators eliminating duplicate user profile requests'
      ]
    },
    {
      id: 2,
      number: '02',
      title: 'E-Commerce Web Application',
      category: 'High-Performance Commerce',
      description: 'A responsive shopping experience with reactive cart management, filtering, search, and mobile-first interaction patterns across all screen sizes.',
      stack: ['Angular', 'Tailwind CSS', 'RxJS', 'Angular Services'],
      metrics: [
        '~60% fewer API calls during active search',
        '300ms debounce with distinctUntilChanged',
        'Mobile-first responsive across 5 breakpoints',
        'Reactive cart engine synced across components'
      ],
      githubUrl: 'https://github.com/BelalAwadallah',
      architectureHighlights: [
        'Reactive search stream debouncing rapid keystrokes to protect backend services',
        'Centralized state service maintaining cart persistence with instant UI synchronization',
        'Mobile slide-over cart drawer with accessible keyboard focus trap'
      ]
    },
    {
      id: 3,
      number: '03',
      title: 'Real-Time Weather Dashboard',
      category: 'Reactive Data Visualization',
      description: 'A reactive weather dashboard designed around predictable loading states, robust error boundaries, and exponential retry strategies.',
      stack: ['Angular', 'OpenWeather API', 'RxJS', 'HttpClient'],
      metrics: [
        'Resilient pipeline: catchError, retry(2), finalize',
        'Predictable loading state via BehaviorSubject',
        'WCAG-focused accessibility & dynamic aria-labels',
        'Instant geolocation retrieval & unit toggles'
      ],
      githubUrl: 'https://github.com/BelalAwadallah',
      architectureHighlights: [
        'Fault-tolerant HTTP request pipeline with automatic retry on intermittent networks',
        'Accessible color-contrast palette meeting WCAG AA standards',
        'Clean separation between data fetching, error state signals, and presentation'
      ]
    }
  ]);

  readonly educationFacts = signal([
    {
      title: 'B.Sc. Information Technology',
      subtitle: 'Excellent — With Honors',
      detail: 'Delta University for Science and Technology',
      icon: 'pi pi-graduation-cap'
    },
    {
      title: 'Huawei Certified',
      subtitle: 'AI & Machine Learning (2024)',
      detail: 'Theoretical foundations and practical model deployment',
      icon: 'pi pi-verified'
    },
    {
      title: 'Location & Availability',
      subtitle: 'Based in Egypt',
      detail: 'Open to remote & flexible full-time / freelance opportunities',
      icon: 'pi pi-globe'
    }
  ]);
}
