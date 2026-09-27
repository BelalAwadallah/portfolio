export interface Service {
  readonly id: number;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly tags: readonly string[];
}
