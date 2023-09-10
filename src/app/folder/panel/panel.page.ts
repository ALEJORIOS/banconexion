import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  send() {
    window.open("https://api.whatsapp.com/send/?phone=%2B573188501911&text=Hola&type=phone_number&app_absent=0"); 
  }

}
