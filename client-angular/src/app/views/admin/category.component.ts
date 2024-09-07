import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core'
import { SearchComponent } from '@app/components/search.component'
import {
  categoryActions,
  selectCategories,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store/category'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private readonly _store = inject(Store);
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $currentPage = signal(1);
  public $searchValue = signal('');
  public $parPage = signal(5);

  public fanPenToSquare = faPenToSquare;
  public faTrash = faTrash;
  public show = false;
  public imageShow = '';
  public state = { name: '', image: '' };

  public loader$: Observable<boolean> = this._store.select(selectLoader);

  public $categories = this._store.selectSignal(selectCategories);

  public $errorMessage = this._store.selectSignal(selectErrorMessage);
  public $successMessage = this._store.selectSignal(selectSuccessMessage);

  constructor() {
    effect(
      (): void => {
        const obj = {
          parPage: this.$parPage(),
          page: this.$currentPage(),
          searchValue: this.$searchValue(),
        };

        this._store.dispatch(categoryActions.getCategories({ payload: obj }));
      },
      { allowSignalWrites: true }
    );

    effect((): void => {
      if (this.$successMessage().length > 0) {
        console.log(`El valor de successMessage es: ${this.$successMessage()}`);
      }

      if (this.$errorMessage().length > 0) {
        console.log(`El valor de errorMessage es: ${this.$errorMessage()}`);
      }
    });
  }

  /* public errorMessage$: Subscription = this._store
    .select(selectErrorMessage)
    .pipe(takeUntil(this._destroy$))
    .subscribe((message: string): void => {
      if (message.length > 0) {
        this._toastr.error(message);

        this._store.dispatch(categoryActions.messageClear());
      }
    });

  public successMessage$: Subscription = this._store
    .select(selectSuccessMessage)
    .pipe(takeUntil(this._destroy$))
    .subscribe((message: string): void => {
      if (message.length > 0) {
        this._toastr.success(message);

        this._store.dispatch(categoryActions.messageClear());

        // Limpiar el formulario
      }
    }); */
}
