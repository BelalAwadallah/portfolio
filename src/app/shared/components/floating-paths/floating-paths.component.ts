import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FloatingPathItem {
  readonly id: number;
  readonly d: string;
  readonly width: number;
  readonly opacity: number;
  readonly duration: number;
  readonly delay: number;
}

@Component({
  selector: 'app-floating-paths',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-paths.component.html',
  styleUrl: './floating-paths.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingPathsComponent {
  /**
   * Generates mathematical cubic bezier curves identical to 21st.dev BackgroundPaths:
   * 36 paths per position, with continuous flowing animation and varying stroke widths.
   */
  private generatePaths(position: number): FloatingPathItem[] {
    return Array.from({ length: 36 }, (_, i) => {
      const duration = 16 + ((i * 5) % 13);
      const delay = -((i * 2.3) % 10);
      // Soft, refined opacity from 0.08 to 0.32 to provide continuous 3D depth without obstructing typography
      const opacity = 0.08 + (i * 0.007);

      return {
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: Number((0.55 + i * 0.022).toFixed(2)),
        opacity: Number(opacity.toFixed(3)),
        duration,
        delay
      };
    });
  }

  readonly positivePaths = signal<readonly FloatingPathItem[]>(
    this.generatePaths(1)
  );

  readonly negativePaths = signal<readonly FloatingPathItem[]>(
    this.generatePaths(-1)
  );
}
