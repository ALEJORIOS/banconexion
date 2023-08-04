import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss'],
})
export class ProgresoComponent  implements OnInit {

  constructor(public storeService: StoreService, private crudService: CrudService) { }

  registros: any = [];
  ngOnInit() {
    console.log('Señal: ', this.storeService.userData())
    this.registros = this.storeService.userData();
  }
  
  refresh() {
    this.crudService.searchDocument(this.storeService.userData()[0].DOCUMENT, this.storeService.userData()[0].DOCUMENT_TYPE).subscribe({
      next: (res) => {
        this.storeService.userData.set(res);
        this.registros = this.storeService.userData();
      }
    })
    
  }

}
