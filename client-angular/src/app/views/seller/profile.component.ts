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
import { RouterLink } from '@angular/router'
import { InfoUser, ShopInfoRequestForm } from '@app/models'
import {
  authActions,
  selectLoader,
  selectSuccessMessage,
  selectUserInfo,
} from '@app/store/auth'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faImage, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
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

  public $userInfo: Signal<InfoUser> = this._store.selectSignal(
    selectUserInfo
  ) as Signal<InfoUser>;

  public $status: WritableSignal<string> = signal('active');

  public shopInfoForm: FormGroup<ShopInfoRequestForm>;

  public faImage: IconDefinition = faImage;
  public faPenToSquare: IconDefinition = faPenToSquare;

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

  public addImage(event: Event): void {
    const file: File | undefined = (event.target as HTMLInputElement)
      .files?.[0];

    if (file) {
      const request: FormData = new FormData();

      request.append('image', file);

      this._store.dispatch(authActions.profileImageUpload({ request }));
    }
  }

  public submit(): void {
    if (this.shopInfoForm.valid) {
      this._store.dispatch(
        authActions.profileInfoAdd({ request: this.shopInfoForm.getRawValue() })
      );
    }
  }
}
