import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
  effect,
  inject,
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
    <!-- <ng-template #btns>
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer"
      >
        Hola
      </li>
    </ng-template> -->
    <ul class="flex gap-3" #btns>
      @if ($pageNumber() > 1) {
      <li
        id="first"
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="setPageNumber.emit($pageNumber() - 1)"
        (keypress)="('')"
        tabindex="0"
      >
        <fa-icon [icon]="faAngleLeft"></fa-icon>
      </li>
      }
      <!-- <ng-container *ngTemplateOutlet="btns"></ng-container> -->
      @if ($pageNumber() < $totalPage()) {
      <li
        id="last"
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="setPageNumber.emit($pageNumber() + 1)"
        (keypress)="('')"
        tabindex="1"
      >
        <fa-icon [icon]="faAngleRight"></fa-icon>
      </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements AfterViewInit {
  @ViewChild('btns', { static: true })
  btns!: ElementRef;

  $pageNumber = input.required<number>();
  $totalItem = input.required<number>();
  $parPage = input.required<number>();
  $showItem = input.required<number>();

  @Output() setPageNumber = new EventEmitter<number>();

  private _renderer = inject(Renderer2);

  public $totalPage = signal(0);
  public $startPage = signal(0);
  public $endPage = signal(0);

  public faAngleRight = faAngleRight;
  public faAngleLeft = faAngleLeft;

  private _domReady = false;

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

        /* if (this._isFirstChange) {
          this._isFirstChange = false;
        } else {
        } */
        if (this._domReady) {
          this.createBtn();
        }
        // console.log(`El valor de totalPage es: ${this.$totalPage()}`);
        // console.log(`El valor de startPage es: ${this.$startPage()}`);
        // console.log(`El valor de endPage es: ${this.$endPage()}`);
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    this._domReady = true;
  }

  private createBtn(): void {
    const elementRef = this.btns.nativeElement.querySelector('#first');

    if (!elementRef) {
      console.log('No existe el elemento');

      return;
    }
    /* let elementRef = '';

    if (this.$pageNumber() > 1) {
      elementRef = this.btns.nativeElement.querySelector('#first');
    }

    if (this.$pageNumber() < this.$totalPage()) {
      elementRef = this.btns.nativeElement.querySelector('#last');
    } */

    for (let i = this.$startPage(); i < this.$endPage(); i++) {
      const li = this._renderer.createElement('li');
      const text = this._renderer.createText(i.toString());

      if (this.$pageNumber() === i) {
        this._renderer.setAttribute(
          li,
          'class',
          'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
        );
      } else {
        this._renderer.setAttribute(
          li,
          'class',
          'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
        );
      }

      this._renderer.setAttribute(
        li,
        'class',
        'w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer'
      );

      this._renderer.appendChild(li, text);

      // this.btns.element.nativeElement.appendChild(li);

      if (this.$pageNumber() > 1) {
        this._renderer.insertBefore(this.btns.nativeElement, li, elementRef);
      }

      if (this.$pageNumber() < this.$totalPage()) {
        this._renderer.insertBefore(this.btns.nativeElement, li, elementRef);
      }

      // this._renderer.insertBefore(this.btns.nativeElement, li, elementRef);
    }
  }
}
