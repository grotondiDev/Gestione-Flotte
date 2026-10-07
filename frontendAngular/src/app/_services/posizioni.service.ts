import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/posizione';

@Injectable({
  providedIn: 'root'
})
export class PosizioniService {

  constructor(private http: HttpClient) { }
  create(targa: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${targa}`, data);
  }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

   getPosizioneMezzi(mezzoId): Observable<any> {
    return this.http.get(`${baseUrl}/${mezzoId}`);
  }
}
