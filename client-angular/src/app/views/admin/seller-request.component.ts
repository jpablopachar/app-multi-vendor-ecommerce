import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seller-request',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>seller-request works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerRequestComponent { }
