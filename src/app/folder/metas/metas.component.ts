import { Component, effect } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss'],
})
export class MetasComponent {

  fees: any = {};

  constructor(public storeService: StoreService) {
    effect(() => {
      if(storeService.fees().length > 0) {
        storeService.fees().forEach((fee: any) => {
          this.fees[fee.ATTRIBUTE] = +fee.VALUE;
        });
      }
    })
  }

  ionViewDidEnter() {
    this.storeService.getFees();
  }
}
