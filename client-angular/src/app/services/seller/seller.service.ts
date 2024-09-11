import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  InfoUser,
  Payload,
  SellerListResponse,
  SellerStatusUpdateResponse
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private _http: HttpClient = inject(HttpClient);

  private _url: string = environment.url;

  public getSellers(payload: Payload): Observable<SellerListResponse> {
    const { page, parPage, searchValue } = payload;

    return this._http.get<SellerListResponse>(
      `${this._url}/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`
    );
  }

  public getSeller(sellerId: string): Observable<{ seller: InfoUser }> {
    return this._http.get<{ seller: InfoUser }>(
      `${this._url}/get-seller/${sellerId}`
    );
  }

  public sellerStatusUpdate(
    body: string
  ): Observable<SellerStatusUpdateResponse> {
    return this._http.post<SellerStatusUpdateResponse>(
      `${this._url}/seller-status-update`,
      body
    );
  }
}
