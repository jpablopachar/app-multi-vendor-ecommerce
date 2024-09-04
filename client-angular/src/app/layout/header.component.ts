import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>Header works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
