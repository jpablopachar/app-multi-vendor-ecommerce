import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NavType } from '@app/models'
import { getNav } from '@app/navigation'
import { selectRole } from '@app/store/auth'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  faRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  template: `<div>
    <div
      class="fixed duration-200 w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10"
      [ngClass]="!showSidebar ? 'invisible' : 'visible'"
      (click)="setShowSidebar.emit(false)"
      (keypress)="('')"
      tabindex="0"
    ></div>
    <div
      class="w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all"
      [ngClass]="showSidebar ? 'left-0' : '-left-[260px] lg:left-0'"
    >
      <div class="h-[70px] flex justify-center items-center">
        <a [routerLink]="'/' + role + '/dashboard'" class="w-[180px] h-[50px]">
          <img src="images/logo.png" alt="logo" class="w-full h-full" />
        </a>
      </div>
      <div class="px-[16px]">
        <ul>
          @for (nav of $navs(); track nav.id) {
          <li>
            <a
              [routerLink]="nav.path"
              class="px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
              [ngClass]="
                router.url === nav.path
                  ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500'
                  : 'text-[#030811] font-bold duration-200'
              "
            >
              <span>
                <fa-icon [icon]="nav.icon"></fa-icon>
              </span>
              <span>{{ nav.title }}</span>
            </a>
          </li>
          }
          <li>
            <button
              class="text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
            >
              <span>
                <fa-icon [icon]="faRightFromBracket"></fa-icon>
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input({ required: true }) showSidebar!: boolean;

  @Output() setShowSidebar = new EventEmitter<boolean>();

  private readonly _store = inject(Store);

  public readonly router: Router = inject(Router);

  public $navs: WritableSignal<never[] | NavType[]> = signal([]);

  public faRightFromBracket: IconDefinition = faRightFromBracket;
  public role!: string;

  public role$: Subscription = this._store
    .select(selectRole)
    .subscribe((role: string): void => {
      this.role = role;

      const navs: NavType[] = getNav(role);

      this.$navs.set(navs);
    });
}
