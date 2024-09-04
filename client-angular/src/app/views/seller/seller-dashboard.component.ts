import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>seller-dashboard works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDashboardComponent { }
