import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  CategoryListResponse,
  CategoryPayload,
  CategoryRequest,
  CategoryResponse,
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _http: HttpClient = inject(HttpClient);

  private _url: string = environment.url;

  public categoryAdd(body: CategoryRequest): Observable<CategoryResponse> {
    const { name, image } = body;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('image', image);

    return this._http.post<CategoryResponse>(
      `${this._url}/category-add`,
      formData
    );
  }

  public getCategories(
    payload: CategoryPayload
  ): Observable<CategoryListResponse> {
    const { page, searchValue, parPage } = payload;

    return this._http.get<CategoryListResponse>(
      `${this._url}/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`
    );
  }
}
