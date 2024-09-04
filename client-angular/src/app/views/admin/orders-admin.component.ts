import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-orders-admin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>orders works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersAdminComponent { }
