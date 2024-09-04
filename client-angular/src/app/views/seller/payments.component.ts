import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>payments works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent { }
