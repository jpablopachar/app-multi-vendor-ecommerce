import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>unauthorized works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnAuthorizedComponent { }
