import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  effect,
  inject,
  input,
  signal
} from '@angular/core'
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <ul class="flex gap-3" #btns></ul> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @ViewChild('btns', { static: true, read: ViewContainerRef })
  btns!: ViewContainerRef;

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

  constructor() {
    library.add(faAngleLeft, faAngleRight);

    effect(
      () => {
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

        this._createBtn();
      },
      { allowSignalWrites: true }
    );
  }

  private _createBtn(): void {
    this._clearItems();

    if (this.$pageNumber() > 1) this._backButton();

    this._insertDynamicItems();

    if (this.$pageNumber() < this.$totalPage()) this._nextButton();
  }

  private _clearItems(): void {
    const ul = this.btns.element.nativeElement;

    ul.innerHTML = '';
  }

  private _backButton(): void {
    requestAnimationFrame(() => {
      const li = this._renderer.createElement('li');

      const currentClass =
        'w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer';

      this._renderer.setAttribute(li, 'class', currentClass);

      const faIconComponentRef = this.btns.createComponent(FaIconComponent);

      faIconComponentRef.setInput('icon', this.faAngleLeft);

      faIconComponentRef.changeDetectorRef.detectChanges();

      this._renderer.appendChild(li, faIconComponentRef.location.nativeElement);

      this._renderer.listen(li, 'click', (): void => {
        this.setPageNumber.emit(this.$pageNumber() - 1);
      });

      this._renderer.appendChild(this.btns.element.nativeElement, li);
    });
  }

  private _insertDynamicItems(): void {
    requestAnimationFrame(() => {
      for (let i: number = this.$startPage(); i < this.$endPage(); i++) {
        const li = this._renderer.createElement('li');

        const classes =
          this.$pageNumber() === i
            ? 'w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
            : 'w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]';

        this._renderer.setAttribute(li, 'class', classes);

        const text = this._renderer.createText(`${i}`);

        this._renderer.appendChild(li, text);

        this._renderer.listen(li, 'click', (): void =>
          this.setPageNumber.emit(i)
        );

        this._renderer.appendChild(this.btns.element.nativeElement, li);
      }
    });
  }

  private _nextButton(): void {
    requestAnimationFrame(() => {
      const li = this._renderer.createElement('li');

      const currentClass =
        'w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer';

      this._renderer.setAttribute(li, 'class', currentClass);

      const faIconComponentRef = this.btns.createComponent(FaIconComponent);

      faIconComponentRef.setInput('icon', this.faAngleRight);

      faIconComponentRef.changeDetectorRef.detectChanges();

      this._renderer.appendChild(li, faIconComponentRef.location.nativeElement);

      this._renderer.listen(li, 'click', (): void => {
        this.setPageNumber.emit(this.$pageNumber() + 1);
      });

      this._renderer.appendChild(this.btns.element.nativeElement, li);
    });
  }
}
