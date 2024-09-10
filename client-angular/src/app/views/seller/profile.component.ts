import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { InfoUser, ShopInfoRequestForm } from '@app/models'
import {
  authActions,
  selectLoader,
  selectSuccessMessage,
  selectUserInfo,
} from '@app/store/auth'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly _store = inject(Store);
  private readonly _formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $loader: Signal<boolean> = this._store.selectSignal(selectLoader);

  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);

  public $userInfo: Signal<string | InfoUser> =
    this._store.selectSignal(selectUserInfo);

  public shopInfoForm: FormGroup<ShopInfoRequestForm>;

  constructor() {
    this.shopInfoForm = this._formBuilder.group({
      division: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      district: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      shopName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sub_district: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    effect(
      (): void => {
        if (this.$successMessage() && this.$successMessage().length > 0) {
          this._toastr.success(this.$successMessage());

          this._store.dispatch(authActions.messageClear());

          this.shopInfoForm.reset();
        }
      },
      { allowSignalWrites: true }
    );
  }
}
