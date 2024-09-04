import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-order-details-admin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>order-details works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsAdminComponent { }
