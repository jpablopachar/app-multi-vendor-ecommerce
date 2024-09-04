import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>Sidebar works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent { }
