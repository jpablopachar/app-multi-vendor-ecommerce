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
import { RouterLink } from '@angular/router'
import { SearchComponent } from '@app/components/search.component'
import { Product } from '@app/models'
import {
  productActions,
  selectProducts,
  selectTotalProducts,
} from '@app/store/product'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faCircleXmark,
  faEye,
  faImage,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly _store = inject(Store);

  public $products: Signal<Product[]> =
    this._store.selectSignal(selectProducts);
  public $totalProducts: Signal<number> =
    this._store.selectSignal(selectTotalProducts);

  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);

  public fanPenToSquare: IconDefinition = faPenToSquare;
  public faTrash: IconDefinition = faTrash;
  public faCircleXmark: IconDefinition = faCircleXmark;
  public faImage: IconDefinition = faImage;
  public faEye: IconDefinition = faEye;

  constructor() {
    effect(
      (): void => {
        const obj = {
          parPage: this.$parPage(),
          page: this.$currentPage(),
          searchValue: this.$searchValue(),
        };

        this._store.dispatch(productActions.getProducts({ payload: obj }));
      },
      { allowSignalWrites: true }
    );
  }
}
