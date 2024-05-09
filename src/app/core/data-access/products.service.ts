import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'products/';

  getAll(index: number) {
    return this.http.get(this.apiUrl + `get/all/${index}/`);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}get/${id}/`);
  }

  getByIds(ids: any) {
    return this.http.post(`${this.apiUrl}get/by-ids/`, ids);
  }

  getSimilar(id: any) {
    return this.http.get(`${this.apiUrl}similar/${id}/`);
  }
}
