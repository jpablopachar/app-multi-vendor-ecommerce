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
import { FormsModule, NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { InfoUser } from '@app/models'
import {
  selectSeller,
  selectSuccessMessage,
  sellerActions,
} from '@app/store/seller'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-seller-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellerDetailsComponent {
  private readonly _store = inject(Store);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $seller: Signal<InfoUser> = this._store.selectSignal(
    selectSeller
  ) as Signal<InfoUser>;

  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $status: WritableSignal<string> = signal('');

  private $_sellerId: WritableSignal<string> = signal(
    this._route.snapshot.params['sellerId']
  );

  constructor() {
    effect(
      (): void => {
        if (this.$successMessage() && this.$successMessage().length > 0) {
          this._toastr.success(this.$successMessage());

          this._store.dispatch(sellerActions.messageClear());
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      (): void => {
        if (this.$_sellerId()) {
          this._store.dispatch(
            sellerActions.getSeller({ sellerId: this.$_sellerId() })
          );
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      (): void => {
        if (this.$seller()) {
          if (this.$seller().status.length > 0) {
            this.$status.set(this.$seller().status);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  public submit(form: NgForm): void {
    if (form.valid) {
      this._store.dispatch(
        sellerActions.sellerStatusUpdate({
          sellerId: this.$_sellerId(),
          status: form.value.status,
        })
      );
    }
  }
}
