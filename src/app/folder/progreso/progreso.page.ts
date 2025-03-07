import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';
import localeCo from '@angular/common/locales/es-CO'
registerLocaleData(localeCo, 'co');

@Component({
    selector: 'app-progreso',
    templateUrl: './progreso.page.html',
    styleUrls: ['./progreso.page.scss'],
    standalone: false
})
export class ProgresoPage {

  campersData: any = [];
  alertMessage: string = "";
  loadingBalance: boolean = true;

  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;

  constructor(private storeService: StoreService, private crudService: CrudService) {
    this.loadingBalance = true;
    effect(() => {
      if(storeService.fees().length > 0) {
        this.loadingBalance = false;
        this.campersData.forEach((camper: any) => {
          camper.TOTAL = this.storeService.getCamperFee(camper.AGE, camper.TRANSPORT === 1 ? true : false)
        })
      }
    })
  }

  ionViewDidEnter() {
    this.campersData = this.storeService.userData();
    this.storeService.getFees();
    this.refresh();
  }

  refresh() {
    this.crudService.searchDocument(this.campersData[0].DOCUMENT, this.campersData[0].DOCUMENT_TYPE).subscribe({
      next: (res) => {
        this.storeService.userData.set(res);
        localStorage.setItem("userData", JSON.stringify(res));
        this.campersData = res;
        this.campersData.forEach((camper: any) => {
          camper.TOTAL = this.storeService.getCamperFee(camper.AGE, camper.TRANSPORT === 1 ? true : false)
        })
      },
      error: (err) => {
        console.error(err);
        this.alertMessage = "Ocurrió un error al actualizar";
        this.errorToast.present();
      }
    })
  }
}