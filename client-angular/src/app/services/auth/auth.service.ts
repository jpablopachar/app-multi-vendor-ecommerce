import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public adminLogin(
    email: string,
    password: string
  ): Observable<{ token: string; message: string }> {
    return this._http.post<{ token: string; message: string }>(
      `${this._url}/admin/login`,
      { email, password }
    );
  }
}
