import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  effect,
  input,
  signal,
} from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-template #btns>
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer"
      >
        Hola
      </li>
    </ng-template>
    <div class="flex gap-3">
      @if ($pageNumber() > 1) {
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="setPageNumber.emit($pageNumber() - 1)"
        (keypress)="('')"
        tabindex="0"
      >
        <fa-icon [icon]="faAngleLeft"></fa-icon>
      </li>
      }
      <ng-container *ngTemplateOutlet="btns"></ng-container>
      @if ($pageNumber() < $totalPage()) {
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="setPageNumber.emit($pageNumber() + 1)"
        (keypress)="('')"
        tabindex="1"
      >
        <fa-icon [icon]="faAngleRight"></fa-icon>
      </li>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  /* @Input({ required: true }) pageNumber!: number;
  @Input({ required: true }) totalItem!: number;
  @Input({ required: true }) parPage!: number;
  @Input({ required: true }) showItem!: number; */
  $pageNumber = input.required<number>();
  $totalItem = input.required<number>();
  $parPage = input.required<number>();
  $showItem = input.required<number>();

  @Output() setPageNumber = new EventEmitter<number>();

  public $totalPage = signal(0);
  public $startPage = signal(0);
  public $endPage = signal(0);

  public faAngleRight = faAngleRight;
  public faAngleLeft = faAngleLeft;

  constructor() {
    effect(
      () => {
        /* console.log(
        `Los valores son: ${this.$pageNumber()}, ${this.$totalItem()}, ${this.$parPage()}, ${this.$showItem()}`
      ); */
        this.$totalPage.set(Math.ceil(this.$totalItem() / this.$parPage()));
        this.$startPage.set(this.$pageNumber());

        const dif = this.$totalPage() - this.$pageNumber();

        if (dif <= this.$showItem())
          this.$startPage.set(this.$totalPage() - this.$showItem());

        this.$endPage.set(
          this.$startPage() < 0
            ? this.$showItem()
            : this.$showItem() + this.$startPage()
        );

        if (this.$startPage() <= 0) this.$startPage.set(1);
        // console.log(`El valor de totalPage es: ${this.$totalPage()}`);
        // console.log(`El valor de startPage es: ${this.$startPage()}`);
        // console.log(`El valor de endPage es: ${this.$endPage()}`);
      },
      { allowSignalWrites: true }
    );
  }
}
