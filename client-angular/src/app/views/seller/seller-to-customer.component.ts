import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seller-to-customer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>seller-to-customer works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerToCustomerComponent { }
