import { Injectable, signal } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userData: any = signal({});
  fees: any = signal([]);

  constructor(private crudService: CrudService) {

  }

  getFees() {
    this.crudService.getFees().subscribe({
      next: (res) => {
        this.fees.set(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getCamperFee(age: number, transport: boolean) {
    let value: number = 0;
    if(age < 2) {
      return 0
    }else if(age < 5) {
      value = +this.fees().filter((fee: any) => fee.ATTRIBUTE === "TARIFA_NINO")[0].VALUE;
    }else if(age < 12) {
      value = +this.fees().filter((fee: any) => fee.ATTRIBUTE === "TARIFA_MENOR")[0].VALUE;
    }else if(age >= 12) {
      value = +this.fees().filter((fee: any) => fee.ATTRIBUTE === "TARIFA_COMPLETA")[0].VALUE;
    }
    // Add transport
    if(transport) {
      value += +this.fees().filter((fee: any) => fee.ATTRIBUTE === "TRANSPORTE")[0].VALUE;
    }
    return value;
  }
}