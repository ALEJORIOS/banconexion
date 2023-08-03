import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  base_url: string = "http://192.168.0.105:3600";

  constructor(private http: HttpClient) { }

  searchDocument(document: string, type: string) {
    return this.http.get<any>(`${this.base_url}/user`, {params: {document, type}});
  }
}
