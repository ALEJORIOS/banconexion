import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
})
export class PersonasComponent  implements OnInit {

  campersData: any = [];
  alertMessage: string = "";
  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.campersData = res;
      },
      error: (err) => {
        console.error(err);
        this.alertMessage = "Ocurrió un error cargando los datos";
        this.errorToast.present();
      }
    })
  }

  refresh() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.campersData = res;
      },
      error: (err) => {
        console.error(err);
        this.alertMessage = "Ocurrió un error cargando los datos";
        this.errorToast.present();
      }
    })
  }

}