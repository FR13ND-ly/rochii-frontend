import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'files/';

  private cache: Map<string, Blob> = new Map();

  uploadImage(e: any) {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}upload-image/`, formData);
  }

  getImage(id: any) {
    const cachedImage = this.cache.get(id);
    if (cachedImage) {
      return of(cachedImage);
    } else {
      return this.http
        .get(`${this.apiUrl}serve-image/${id}/`, {
          responseType: 'blob',
        })
        .pipe(
          map((response) => {
            this.cache.set(id, response);
            return response;
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
    }
  }
}
