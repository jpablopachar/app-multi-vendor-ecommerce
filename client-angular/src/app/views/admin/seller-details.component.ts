import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>seller-details works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDetailsComponent { }
