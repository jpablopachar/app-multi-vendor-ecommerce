import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  Product,
  ProductListResponse,
  ProductPayload,
  ProductUpdateRequest,
  ProductUpdateResponse
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

  public getProduct(productId: string): Observable<{ product: Product }> {
    return this._http.get<{ product: Product }>(
      `${this._url}/product-get/${productId}`
    );
  }

  public updateProduct(body: ProductUpdateRequest): Observable<ProductUpdateResponse> {
    return this._http.post<ProductUpdateResponse>(
      `${this._url}/product-update`,
      body
    );
  }
}
