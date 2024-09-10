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
  productActions,
  selectErrorMessage,
  selectLoader,
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
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
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
  public $imageShow: WritableSignal<{ url: string }[]> = signal([]);
  public $images: WritableSignal<File[]> = signal([]);
  public $allCategory: WritableSignal<Category[]> = signal([]);

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
        if (this.$categories().length > 0) {
          this.$allCategory.set(this.$categories());
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

  public categorySearch(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;

    this.$searchValue.set(value);

    if (value) {
      const srcValue = this.$allCategory().filter(
        (category) =>
          category.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );

      this.$allCategory.set(srcValue);
    } else {
      this.$allCategory.set(this.$categories());
    }
  }

  public imageHandle(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files && files?.length > 0) {
      const filesArray: File[] = Array.from(files);

      // this.$images.set([...this.$images(), ...filesArray]);
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

  public changeImage(event: Event, index: number): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      const file = files[0];
      const tempUrl: { url: string }[] = this.$imageShow();
      const tempImages: File[] = this.$images();

      tempImages[index] = file;
      tempUrl[index] = { url: URL.createObjectURL(file) };

      this.$imageShow.set([...tempUrl]);
      this.$images.set([...tempImages]);
    }
  }

  public removeImage(index: number): void {
    const filterImage: File[] = this.$images().filter(
      (_: File, i: number): boolean => i !== index
    );

    const filterUrl: { url: string }[] = this.$imageShow().filter(
      (_: { url: string }, i: number): boolean => i !== index
    );

    this.$images.set(filterImage);
    this.$imageShow.set(filterUrl);
  }

  public submit(): void {
    if (this.productForm.valid) {
      const { name, brand, category, stock, price, discount, description } =
        this.productForm.getRawValue();

      const formData = new FormData();

      formData.append('name', name);
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('stock', stock);
      formData.append('price', price);
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('shopName', 'EasyShop');

      this.$images().forEach((image: File): void => {
        formData.append('images', image);
      });

      this._store.dispatch(productActions.addProduct({ request: formData }));
    }
  }
}
