import { Component, OnInit, effect } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { StoreService } from './services/store.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Progreso', url: '/progreso', icon: 'bar-chart' },
    { title: 'Metas', url: '/metas', icon: 'ribbon' },
    { title: 'Personas', url: '/personas', icon: 'accessibility' },
    { title: 'Transacciones', url: '/transacciones', icon: 'cash' },
    { title: 'Salir', url: '/inicio', icon: 'home' }
  ];

  currentFolder: string = "";

  constructor(private router: Router, private storeService: StoreService) {

    effect(() => {
      if(this.storeService.userData()[0]?.DOCUMENT === "1032488686" && this.appPages.find(page => page.title === "Errores") === undefined) {
        this.appPages.splice(-1, 0, { title: 'Errores', url: '/fallas', icon: 'alert-circle' })
      }
    })
    router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
        this.currentFolder = (event as NavigationEnd).urlAfterRedirects.substring(1)
      })
      if(localStorage.getItem("userData")) {
        storeService.userData.set(JSON.parse(localStorage.getItem("userData") || ""))
      }
    }
}
