import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>pagination works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent { }
