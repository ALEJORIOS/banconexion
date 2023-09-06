import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  base_url: string = "http://192.168.0.105:3600";

  constructor(private http: HttpClient) { }

  checkMaintenance() {
    return this.http.get<any>(`${this.base_url}/check-maintenance`);
  }

  searchDocument(document: string, type: string) {
    return this.http.get<any>(`${this.base_url}/user`, {params: {document, type}});
  }

  searchAllUsers() {
    return this.http.get<any>(`${this.base_url}/all-users`)
  }

  searchTransactions(id: number) {
    return this.http.get<any>(`${this.base_url}/filtered-transactions`, {params: {id}});
  }

  payment(requestBody: any) {
    return this.http.post<any>(`${this.base_url}/payment`, requestBody)
  }

  getFees() {
    return this.http.get<any>(`${this.base_url}/fees`);
  }

  getFailures(skip: number, limit: number) {
    return this.http.get<any>(`${this.base_url}/failures`, {params: {skip, limit}});
  }

  register(requestBody: any) {
    return this.http.post<any>(`${this.base_url}/register`, requestBody);
  }

  edit(requestBody: any, id: number) {
    return this.http.put<any>(`${this.base_url}/edit-user`, requestBody, {params: {id}})
  }
}