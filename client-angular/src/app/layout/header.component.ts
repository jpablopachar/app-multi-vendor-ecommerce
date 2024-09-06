import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<div class="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
    <div
      class="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all"
    >
      <div
        class="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        (click)="setShowSidebar.emit(!showSidebar)"
        (keypress)="('')"
        tabindex="0"
      >
        <fa-icon [icon]="faList"></fa-icon>
      </div>
      <div class="hidden md:block">
        <input
          class="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#423d72] focus:border-indigo-300 overflow-hidden"
          type="text"
          name="search"
          placeholder="search"
        />
      </div>
      <div class="flex justify-center items-center gap-8 relative">
        <div class="flex justify-center items-center">
          <div class="flex justify-center items-center gap-3">
            <div class="flex justify-center items-center flex-col text-end">
              <h2 class="text-md font-bold">Juan Pachar</h2>
              <span class="text-[14px] w-full font-normal">Admin</span>
            </div>
            <img
              class="w-[45px] h-[45px] rounded-full overflow-hidden"
              src="images/admin.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) showSidebar!: boolean;

  @Output() setShowSidebar = new EventEmitter<boolean>();

  public faList: IconDefinition = faList;
}
