import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { AuthStore } from '@app/store'

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
export class AdminLoginComponent {
  private readonly authStore = inject(AuthStore);

  public submit(form: NgForm): void {
    if (form.valid) {
      this.authStore.adminLogin(form.value);
    }
  }
}
