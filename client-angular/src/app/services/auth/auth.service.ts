import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { AuthResponse, LoginUser } from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  private _url: string;

  constructor() {
    this._url = environment.url;
  }

  public adminLogin(body: LoginUser): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._url}/auth/admin-login`, body);
  }
}
