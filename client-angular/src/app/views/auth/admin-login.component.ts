import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Router } from '@angular/router'
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
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div
    class="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center"
  >
    <div class="w-[350px] text-[#ffffff] p-2">
      <div class="bg-[#6f68d1] p-4 rounded-md">
        <div class="h-[70px] flex justify-center items-center">
          <div class="w-[180px] h-[50px]">
            <img class="w-full h-full" src="images/logo.png" alt="image" />
          </div>
        </div>
        <form #adminLoginForm="ngForm" (ngSubmit)="submit(adminLoginForm)">
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
            Login
          </button>
        </form>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent implements OnDestroy {
  private readonly _store = inject(Store);
  private readonly _toastr: ToastrService = inject(ToastrService);
  private readonly _router: Router = inject(Router);

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

        this._router.navigate(['/admin/dashboard']);
      }
    });

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(form: NgForm): void {
    if (form.valid) {
      this._store.dispatch(authActions.adminLogin({ request: form.value }));
    }
  }
}
