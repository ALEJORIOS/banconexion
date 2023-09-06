import { Component, OnInit, ViewChild, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage {

  campersData: any = [];
  alertMessage: string = "";

  area: string = "";

  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;
  constructor(private storeService: StoreService, private crudService: CrudService, private route: ActivatedRoute) {
    this.area = this.route.snapshot.paramMap.get("area") || "";

  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.crudService.searchByArea(this.area).subscribe({
      next: (res) => {
        this.campersData = res;
      },
      error: (err) => {
        console.error(err);
        this.alertMessage = "Ocurrió un error al actualizar";
        this.errorToast.present();
      }
    })
  }

}
