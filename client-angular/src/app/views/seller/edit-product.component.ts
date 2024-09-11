import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
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
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Product, ProductRequestForm, ProductUpdateRequest } from '@app/models'
import {
  productActions,
  selectErrorMessage,
  selectLoader,
  selectProduct,
  selectSuccessMessage,
} from '@app/store/product'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faCircleXmark, faImage } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './edit-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent {
  private readonly _store = inject(Store);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $loader: Signal<boolean> = this._store.selectSignal(selectLoader);

  public $errorMessage: Signal<string> =
    this._store.selectSignal(selectErrorMessage);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  private $_product: Signal<string | Product> =
    this._store.selectSignal(selectProduct);

  public $searchValue: WritableSignal<string> = signal('');
  public $imageShow: WritableSignal<{ url: string }[]> = signal([]);
  public $images: WritableSignal<File[]> = signal([]);

  private $_productId: WritableSignal<string> = signal(
    this._route.snapshot.params['productId']
  );

  public productForm: FormGroup<ProductRequestForm>;

  public faImage: IconDefinition = faImage;
  public faCircleXmark: IconDefinition = faCircleXmark;

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
    });

    effect(
      (): void => {
        if (this.$successMessage() && this.$successMessage().length > 0) {
          this._toastr.success(this.$successMessage());

          this._store.dispatch(productActions.messageClear());

          this.productForm.reset();

          this.$imageShow.set([]);
          this.$images.set([]);
        }

        if (this.$errorMessage() && this.$errorMessage().length > 0) {
          this._toastr.error(this.$errorMessage());

          this._store.dispatch(productActions.messageClear());
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      (): void => {
        if (this.$_productId()) {
          this._store.dispatch(
            productActions.getProduct({ productId: this.$_productId() })
          );
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      (): void => {
        if (this.$_product()) {
          const {
            name,
            brand,
            category,
            stock,
            price,
            discount,
            description,
            images,
          } = this.$_product() as Product;

          this.productForm.patchValue({
            name,
            brand,
            category,
            stock: String(stock),
            price: String(price),
            discount: String(discount),
            description,
          });

          const imagesTemp = images.map((image: string): { url: string } => ({
            url: image,
          }));

          this.$imageShow.set(imagesTemp);
        }
      },
      { allowSignalWrites: true }
    );
  }

  public imageHandle(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files && files?.length > 0) {
      const filesArray: File[] = Array.from(files);

      this.$images.update((prev: File[]): File[] => [...prev, ...filesArray]);

      const imageUrl: { url: string }[] = [];

      filesArray.forEach((file: File): void => {
        imageUrl.push({ url: URL.createObjectURL(file) });
      });

      this.$imageShow.update((prev: { url: string }[]) => [
        ...prev,
        ...imageUrl,
      ]);
    }
  }

  public submit(): void {
    if (this.productForm.valid) {
      const { name, brand, stock, price, discount, description } =
        this.productForm.getRawValue();

      const request: ProductUpdateRequest = {
        name,
        brand,
        stock: Number(stock),
        price: Number(price),
        discount: Number(discount),
        description,
        productId: this.$_productId(),
      };

      this._store.dispatch(productActions.editProduct({ request }));
    }
  }
}
