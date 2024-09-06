import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './header.component'
import { SidebarComponent } from './sidebar.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="bg-[#cdcae9] w-full min-h-screen">
      <app-header
        [showSidebar]="showSidebar"
        (setShowSidebar)="showSidebar = $event"
      ></app-header>
      <app-sidebar
        [showSidebar]="showSidebar"
        (setShowSidebar)="showSidebar = $event"
      ></app-sidebar>
      <div class="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <router-outlet />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public showSidebar = false;
}
