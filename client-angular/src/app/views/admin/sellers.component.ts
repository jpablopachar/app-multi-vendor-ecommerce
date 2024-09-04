import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>sellers works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellersComponent { }
