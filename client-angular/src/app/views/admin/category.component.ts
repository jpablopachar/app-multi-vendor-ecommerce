import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { SearchComponent } from '@app/components/search.component'
import { Category, CategoryRequestForm } from '@app/models'
import {
  categoryActions,
  selectCategories,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store/category'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  faCircleXmark,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private readonly _store = inject(Store);
  private readonly _formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $currentPage = signal(1);
  public $searchValue = signal('');
  public $parPage = signal(5);
  public $show = signal(false);

  public fanPenToSquare = faPenToSquare;
  public faTrash = faTrash;
  public faCircleXmark = faCircleXmark;
  public imageShow = '';
  public state = { name: '', image: '' };

  public categoryForm: FormGroup<CategoryRequestForm>;

  public $loader: Signal<boolean> = this._store.selectSignal(selectLoader);

  public $categories: Signal<Category[]> = this._store.selectSignal(selectCategories);

  public $errorMessage: Signal<string> = this._store.selectSignal(selectErrorMessage);
  public $successMessage: Signal<string> = this._store.selectSignal(selectSuccessMessage);

  constructor() {
    this.categoryForm = this._formBuilder.group({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      image: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

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

  public submit(): void {
    if (this.categoryForm.valid) {
      this._store.dispatch(
        categoryActions.categoryAdd({
          request: this.categoryForm.getRawValue(),
        })
      );
    }
  }
}
