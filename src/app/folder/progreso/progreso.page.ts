import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.page.html',
  styleUrls: ['./progreso.page.scss'],
})
export class ProgresoPage implements OnInit {

  campersData: any = [];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.campersData = this.storeService.userData();
    console.log('>>> ', this.campersData)
  }

  

}
