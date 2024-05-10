import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'administrator/';

  getAllProducts(index: number) {
    return this.http.get(`${this.apiUrl}products/get/all/${index}/`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}products/get/${id}/`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}products/create/`, data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put(`${this.apiUrl}products/update/${id}/`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}products/delete/${id}/`);
  }

  getOrders(index: number) {
    return this.http.get(`${this.apiUrl}orders/get/${index}/`);
  }

  completeOrder(id: number) {
    return this.http.get(`${this.apiUrl}orders/complete/${id}/`);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.apiUrl}orders/delete/${id}/`);
  }

  getDashboard() {
    return this.http.get(`${this.apiUrl}dashboard/`);
  }

  getStatistics() {
    return this.http.get(`${this.apiUrl}statistics/`);
  }
}
