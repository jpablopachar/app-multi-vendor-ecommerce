import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import {
  authActions,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject, Subscription, takeUntil } from 'rxjs'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center"
    >
      <div class="w-[350px] text-[#ffffff] p-2">
        <div class="bg-[#6f68d1] p-4 rounded-md">
          <h2 class="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p class="text-sm mb-3 font-medium">Please register your account</p>
          <form [formGroup]="registerForm" (ngSubmit)="submit()">
            <div class="flex flex-col w-full gap-1 mb-3">
              <label for="name">Name</label>
              <input
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                formControlName="name"
              />
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label for="email">Email</label>
              <input
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                formControlName="email"
              />
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label for="password">Password</label>
              <input
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                formControlName="password"
              />
            </div>
            <div class="flex items-center w-full gap-3 mb-3">
              <input
                class="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox"
                >I agree to privacy policy & teams</label
              >
            </div>
            <button
              type="submit"
              [disabled]="(loader$ | async) ? true : false"
              class="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              Sign Up
            </button>
            <div class="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account ?
                <a routerLink="/login" class="font-bold">Sign In</a>
              </p>
            </div>
            <div class="w-full flex justify-center items-center mb-3">
              <div class="w-[45%] bg-slate-700 h-[1px]"></div>
              <div class="w-[10%] flex justify-center items-center">
                <span class="pb-1">Or</span>
              </div>
              <div class="w-[45%] bg-slate-700 h-[1px] "></div>
            </div>
            <div class="flex justify-center items-center gap-3">
              <div
                class="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <!-- <FaGoogle /> -->
                  Google
                </span>
              </div>
              <div
                class="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <!-- <FaFacebook /> -->
                  Facebook
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly _toastr: ToastrService = inject(ToastrService);
  private readonly _router: Router = inject(Router);

  public registerForm: FormGroup;

  constructor() {
    this.registerForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{10,}'
          ),
        ],
      ],
    });
  }

  private _destroy$: Subject<void> = new Subject<void>();

  public loader$: Observable<boolean> = this._store.select(selectLoader);

  public errorMessage$: Subscription = this._store
    .select(selectErrorMessage)
    .pipe(takeUntil(this._destroy$))
    .subscribe((message: string): void => {
      if (message.length > 0) {
        this._toastr.error(message);

        this._store.dispatch(authActions.messageClear());
      }
    });

  public successMessage$: Subscription = this._store
    .select(selectSuccessMessage)
    .pipe(takeUntil(this._destroy$))
    .subscribe((message: string): void => {
      if (message.length > 0) {
        this._toastr.success(message);

        this._store.dispatch(authActions.messageClear());

        this._router.navigate(['/seller/dashboard']);
      }
    });

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(): void {
    if (this.registerForm.valid) {
      this._store.dispatch(
        authActions.sellerLogin({ request: this.registerForm.getRawValue() })
      );
    }
  }
}
