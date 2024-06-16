import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // base_url: string = "http://192.168.0.23:3600";
  // base_url: string = "http://192.168.11.7:3600";
  base_url: string = 'https://banconexion-back.vercel.app';

  constructor(private http: HttpClient) { }

  checkMaintenance() {
    return this.http.get<any>(`${this.base_url}/check-maintenance`);
  }

  approveTransactions(ids: number[]) {
    return this.http.put<any>(`${this.base_url}/transaction-approval`, { ids });
  }

  searchDocument(document: string, type: string) {
    return this.http.get<any>(`${this.base_url}/user`, {
      params: { document, type },
    });
  }

  loginAdmin(requestBody: any) {
    return this.http.post<any>(`${this.base_url}/login`, requestBody);
  }

  searchAllUsers() {
    return this.http.get<any>(`${this.base_url}/all-users`);
  }

  allTransactions() {
    return this.http.get<any>(`${this.base_url}/transactions`);
  }

  searchTransactions(id: number) {
    return this.http.get<any>(`${this.base_url}/filtered-transactions`, {
      params: { id },
    });
  }

  searchByArea(area: string) {
    return this.http.get<any>(`${this.base_url}/area`, { params: { area } });
  }

  editTransaction(id: number, requestBody: any) {
    return this.http.put<any>(
      `${this.base_url}/edit-transaction`,
      requestBody,
      { params: { id } }
    );
  }

  payment(requestBody: any) {
    return this.http.post<any>(`${this.base_url}/payment`, requestBody);
  }

  getFees() {
    return this.http.get<any>(`${this.base_url}/fees`);
  }

  getFailures(skip: number, limit: number) {
    return this.http.get<any>(`${this.base_url}/failures`, {
      params: { skip, limit },
    });
  }

  register(requestBody: any) {
    return this.http.post<any>(`${this.base_url}/register`, requestBody);
  }

  edit(requestBody: any, id: number) {
    return this.http.put<any>(`${this.base_url}/edit-user`, requestBody, {
      params: { id },
    });
  }

  exportReport() {
    return this.http.post<Blob>(`${this.base_url}/export-report`, null, { observe: 'response', responseType: 'blob' as 'json' });
  }

  exportTransactions() {
    return this.http.post<Blob>(`${this.base_url}/export-transactions`, null, { observe: 'response', responseType: 'blob' as 'json' });
  }

  getRelations(document: number, type: string) {
    return this.http.get<any>(`${this.base_url}/relationships`, {
      params: { document, type },
    });
  }

  updateRelations(parentId: number, childrenId: number[]) {
    return this.http.put<any>(`${this.base_url}/relationships`, {
      id: parentId,
      children: childrenId,
    });
  }
}
