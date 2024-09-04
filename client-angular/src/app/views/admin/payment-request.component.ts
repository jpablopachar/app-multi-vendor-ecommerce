import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-request',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>payment-request works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentRequestComponent { }
