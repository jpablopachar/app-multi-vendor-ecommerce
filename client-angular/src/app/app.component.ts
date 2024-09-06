import { Component, inject, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { authActions, selectToken } from './store/auth'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private readonly _store = inject(Store);

  private _token$: Subscription = this._store
    .select(selectToken)
    .subscribe((token: string | null): void => {
      if (token !== null) this._store.dispatch(authActions.getUserInfo());
    });

  ngOnDestroy(): void {
    this._token$.unsubscribe();
  }
}
