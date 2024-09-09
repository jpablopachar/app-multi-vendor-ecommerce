import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Category, ProductRequestForm } from '@app/models'
import { selectCategories } from '@app/store/category'
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
export class AddProductComponent {
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
        validators: [Validators.required],
      }),
      image: new FormControl<File | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
