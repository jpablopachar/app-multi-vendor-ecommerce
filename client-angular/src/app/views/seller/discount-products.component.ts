import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-discount-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>discount-products works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountProductsComponent { }
