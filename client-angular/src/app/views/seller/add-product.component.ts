import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Category, CategoryPayload, ProductRequestForm } from '@app/models'
import { categoryActions, selectCategories } from '@app/store/category'
import {
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store/product'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
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

  public $searchValue: WritableSignal<string> = signal('');
  public $cateShow: WritableSignal<boolean> = signal(false);
  public $imageShow = signal([]);

  public productForm: FormGroup<ProductRequestForm>;

  constructor() {
    this.productForm = this._formBuilder.group({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      brand: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      category: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      stock: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      discount: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl<string>('', {
        nonNullable: true,
      }),
      image: new FormControl<File | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    effect(
      (): void => {
        if (this.$successMessage().length > 0) {
          this._toastr.success(this.$successMessage());

          // this._store.dispatch(categoryActions.messageClear());

          this.productForm.reset();

          this.$imageShow.set([]);
        }

        if (this.$errorMessage().length > 0) {
          this._toastr.error(this.$errorMessage());

          // this._store.dispatch(categoryActions.messageClear());
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    const payload: CategoryPayload = {
      parPage: '',
      page: '',
      searchValue: '',
    };

    this._store.dispatch(categoryActions.getCategories({ payload }));
  }

  public searchValue(event: Event): void {
    console.log((event.target as HTMLInputElement).value);
  }

  public submit(): void {
    console.log(this.productForm.value);
  }
}
