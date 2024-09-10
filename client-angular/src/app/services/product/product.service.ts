import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  ProductListResponse,
  ProductPayload
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http: HttpClient = inject(HttpClient);

  private _url: string = environment.url;

  public addProduct(body: FormData): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      `${this._url}/product-add`,
      body
    );
  }

  public getProducts(payload: ProductPayload): Observable<ProductListResponse> {
    const { page, searchValue, parPage } = payload;

    return this._http.get<ProductListResponse>(
      `${this._url}/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`
    );
  }
}
