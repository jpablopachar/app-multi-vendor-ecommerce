import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import {
  authActions,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
} from '@app/store'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject, Subscription, takeUntil } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule],
  template: `<div
    class="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center"
  >
    <div class="w-[350px] text-[#ffffff] p-2">
      <div class="bg-[#6f68d1] p-4 rounded-md">
        <h2 class="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
        <p class="text-sm mb-3 font-medium">Please Sing In your account</p>
        <form #loginForm="ngForm" (ngSubmit)="submit(loginForm)">
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="email">Email</label>
            <input
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              ngModel
              required
              email
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
              ngModel
              required
              pattern=".{10,}"
            />
          </div>
          <button
            type="submit"
            [disabled]="(loader$ | async) ? true : false"
            class="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
          >
            Sign In
          </button>
          <div class="flex items-center mb-3 gap-3 justify-center">
            <p>
              Dont Have an account
              <a routerLink="/register" class="font-bold">Sign Up</a>
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
                <fa-icon [icon]="faArrowAltCircleLeft"></fa-icon>
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
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private readonly _store = inject(Store);
  private readonly _toastr: ToastrService = inject(ToastrService);
  private readonly _router: Router = inject(Router);

  private _destroy$: Subject<void> = new Subject<void>();

  public faArrowAltCircleLeft = faArrowAltCircleLeft;

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

  public submit(form: NgForm): void {
    if (form.valid) {
      this._store.dispatch(authActions.sellerLogin({ request: form.value }));
    }
  }
}
