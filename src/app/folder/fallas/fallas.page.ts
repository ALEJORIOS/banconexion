import { registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import localeCo from '@angular/common/locales/es-CO';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
registerLocaleData(localeCo, 'co');

@Component({
  selector: 'app-fallas',
  templateUrl: './fallas.page.html',
  styleUrls: ['./fallas.page.scss'],
  providers: [{provide: LOCALE_ID, useValue: 'co'}]
})
export class FallasPage implements OnInit {

  alertMessage: string = "";
  failures: any = [];
  currentPage: number = 0;
  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.crudService.getFailures(0, 10).subscribe({
      next: (res) => {
        this.failures = res;
        this.failures = this.failures.map((fail: any) => {
          let newDate = new Date(fail.DATE);
          newDate = this.addHours(newDate);
          return {
            ...fail,
            DATE: newDate
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.alertMessage = "Ocurrió un error";
        this.errorToast.present();
      }
    })
  }

  onIonInfinite(ev: Event) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  generateItems() {
    this.crudService.getFailures((++this.currentPage)*10, 10).subscribe({
      next: (res) => {
        this.failures.push(...res);
      }
    })
  }

  addHours(date: Date) {
    date.setHours(date.getHours() - 5);
    return date;
  }

}