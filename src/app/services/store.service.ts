import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userData: any = signal({});
  fees: any = signal({});

  constructor() {

  }
}
