import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'orders/';

  create(data: any) {
    return this.http.post(`${this.apiUrl}create/`, data);
  }

  getAvailableHours(data: any) {
    return this.http.post(`${this.apiUrl}get-available-hours/`, data);
  }
}
