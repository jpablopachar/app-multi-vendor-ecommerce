import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  InputSignal,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  effect,
  inject,
  input,
  signal,
} from '@angular/core'
import {
  FaIconComponent,
  FontAwesomeModule,
  IconDefinition,
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

  $pageNumber: InputSignal<number> = input.required<number>();
  $totalItem: InputSignal<number> = input.required<number>();
  $parPage: InputSignal<number> = input.required<number>();
  $showItem: InputSignal<number> = input.required<number>();

  @Output() setPageNumber: EventEmitter<number> = new EventEmitter<number>();

  private _renderer: Renderer2 = inject(Renderer2);

  public $totalPage: WritableSignal<number> = signal(0);
  public $startPage: WritableSignal<number> = signal(0);
  public $endPage: WritableSignal<number> = signal(0);

  public faAngleRight: IconDefinition = faAngleRight;
  public faAngleLeft: IconDefinition = faAngleLeft;

  constructor() {
    library.add(faAngleLeft, faAngleRight);

    effect(
      () => {
        this.$totalPage.set(Math.ceil(this.$totalItem() / this.$parPage()));
        this.$startPage.set(this.$pageNumber());

        const dif: number = this.$totalPage() - this.$pageNumber();

        if (dif <= this.$showItem())
          this.$startPage.set(this.$totalPage() - this.$showItem());

        this.$endPage.set(
          this.$startPage() < 0
            ? this.$showItem()
            : this.$showItem() + this.$startPage()
        );

        if (this.$startPage() <= 0) this.$startPage.set(1);

        this._generateBtns();
      },
      { allowSignalWrites: true }
    );
  }

  private _generateBtns(): void {
    this._clearItems();

    if (this.$pageNumber() > 1) this._backButton();

    this._insertDynamicItems();

    if (this.$pageNumber() < this.$totalPage()) this._nextButton();
  }

  private _clearItems(): void {
    const ul = this.btns.element.nativeElement;

    ul.innerHTML = '';
  }

  private _createButton(
    icon: IconDefinition | null,
    value: number | null,
    onClick: () => void,
    customClasses: string
  ): void {
    const li = this._renderer.createElement('li');
    const defaultClasses =
      'w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer';

    this._renderer.setAttribute(
      li,
      'class',
      `${customClasses} ${defaultClasses}`
    );

    if (icon) {
      const faIconComponentRef: ComponentRef<FaIconComponent> =
        this.btns.createComponent(FaIconComponent);

      faIconComponentRef.setInput('icon', icon);

      faIconComponentRef.changeDetectorRef.detectChanges();

      this._renderer.appendChild(li, faIconComponentRef.location.nativeElement);
    } else {
      const text = this._renderer.createText(`${value}`);

      this._renderer.appendChild(li, text);
    }

    this._renderer.listen(li, 'click', onClick);
    this._renderer.appendChild(this.btns.element.nativeElement, li);
  }

  private _backButton(): void {
    this._createButton(
      this.faAngleLeft,
      null,
      (): void => this.setPageNumber.emit(this.$pageNumber() - 1),
      'bg-slate-300 text-[#000000]'
    );
  }

  private _insertDynamicItems(): void {
    for (let i: number = this.$startPage(); i < this.$endPage(); i++) {
      const isCurrentPage = this.$pageNumber() === i;
      const classes = isCurrentPage
        ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
        : 'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]';

      this._createButton(null, i, () => this.setPageNumber.emit(i), classes);
    }
  }

  private _nextButton(): void {
    this._createButton(
      this.faAngleRight,
      null,
      () => this.setPageNumber.emit(this.$pageNumber() + 1),
      'bg-slate-300 text-[#000000]'
    );
  }
}
