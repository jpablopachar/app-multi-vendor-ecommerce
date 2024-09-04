import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seller-to-admin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>seller-to-admin works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerToAdminComponent { }
