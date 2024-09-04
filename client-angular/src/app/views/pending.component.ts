import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>pending works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingComponent { }
