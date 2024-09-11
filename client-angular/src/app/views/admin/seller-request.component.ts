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
import { InfoUser } from '@app/models'
import { selectSellers, sellerActions } from '@app/store/seller'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { PaginationComponent } from '../pagination.component'

@Component({
  selector: 'app-seller-details',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './seller-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerRequestComponent {
  private readonly _store = inject(Store);

  public $sellers: Signal<InfoUser[]> = this._store.selectSignal(selectSellers);

  public $currentPage: WritableSignal<number> = signal(1);
  public $searchValue: WritableSignal<string> = signal('');
  public $parPage: WritableSignal<number> = signal(5);

  public faEye: IconDefinition = faEye;

  constructor() {
    effect(
      (): void => {
        const obj = {
          parPage: this.$parPage(),
          page: this.$currentPage(),
          searchValue: this.$searchValue(),
        };

        this._store.dispatch(sellerActions.getSellers({ payload: obj }));
      },
      { allowSignalWrites: true }
    );
  }
}

