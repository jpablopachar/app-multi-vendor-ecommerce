import { inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import {
  ActivatedRouteSnapshot,
  Router,
  type CanActivateFn,
} from '@angular/router'
import { GetUser } from '@app/models'
import { selectRole, selectUserInfo } from '@app/store'
import { Store } from '@ngrx/store'

export const protectRouteGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): boolean | Promise<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  const $role: Signal<string | undefined> = toSignal(store.select(selectRole));
  const $userInfo: Signal<string | GetUser | undefined> = toSignal(
    store.select(selectUserInfo)
  );

  const { role, status, visibility } = route.data;

  if (!$role()) return router.navigate(['/login']);

  if (role) {
    if ($userInfo()) {
      if (($userInfo() as GetUser).role === role) {
        if (status) {
          if (status !== ($userInfo() as GetUser).status) {
            if (($userInfo() as GetUser).status === 'pending') {
              return router.navigate(['/seller/account-pending']);
            } else {
              return router.navigate(['/seller/account-deactive']);
            }
          }
        } else {
          if (visibility) {
            if (
              !(visibility as string[]).some(
                (r: string): boolean => r === ($userInfo() as GetUser).status
              )
            ) {
              return router.navigate(['/seller/account-pending']);
            }
          }
        }
      } else {
        return router.navigate(['/unauthorized']);
      }
    }
  }

  return true;
};
