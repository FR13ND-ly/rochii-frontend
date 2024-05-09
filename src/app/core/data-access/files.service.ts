import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'files/';

  uploadImage(e: any) {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}upload-image/`, formData);
  }

  getImage(id: any) {
    return this.http.get(`${this.apiUrl}serve-image/${id}/`, {
      responseType: 'blob',
    });
  }
}
