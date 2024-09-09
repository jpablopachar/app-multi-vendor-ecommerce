import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { SearchComponent } from '@app/components/search.component'
import { Category, CategoryRequest, CategoryRequestForm } from '@app/models'
import {
  categoryActions,
  selectCategories,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store/category'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faCircleXmark,
  faImage,
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

  public $loader: Signal<boolean> = this._store.selectSignal(selectLoader);

  public $categories: Signal<Category[]> =
    this._store.selectSignal(selectCategories);

  public $errorMessage: Signal<string> =
    this._store.selectSignal(selectErrorMessage);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);
  public $show: WritableSignal<boolean> = signal(false);
  public $imageShow = signal('');

  public fanPenToSquare: IconDefinition = faPenToSquare;
  public faTrash: IconDefinition = faTrash;
  public faCircleXmark: IconDefinition = faCircleXmark;
  public faImage: IconDefinition = faImage;

  public categoryForm: FormGroup<CategoryRequestForm>;

  constructor() {
    this.categoryForm = this._formBuilder.group({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      image: new FormControl<File | null>(null, {
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

    effect(
      (): void => {
        if (this.$successMessage().length > 0) {
          this._toastr.success(this.$successMessage());

          this._store.dispatch(categoryActions.messageClear());

          this.categoryForm.reset();

          this.$imageShow.set('');
        }

        if (this.$errorMessage().length > 0) {
          this._toastr.error(this.$errorMessage());

          this._store.dispatch(categoryActions.messageClear());
        }
      },
      { allowSignalWrites: true }
    );
  }

  public imageHandle(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files && files?.length > 0) {
      this.$imageShow.set(URL.createObjectURL(files[0]));

      this.categoryForm.controls['image'].setValue(files[0]);
    }
  }

  public submit(): void {
    if (this.categoryForm.valid) {
      const request: CategoryRequest = {
        name: this.categoryForm.controls['name'].value,
        image: this.categoryForm.controls['image'].value as File,
      };

      this._store.dispatch(categoryActions.categoryAdd({ request }));
    }
  }
}
