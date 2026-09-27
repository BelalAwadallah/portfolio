export interface Project {
  readonly id: number;
  readonly number: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly metrics: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly architectureHighlights: readonly string[];
}
