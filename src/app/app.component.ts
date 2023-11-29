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
  public appPages: any = [ ];

  currentFolder: string = "";

  constructor(private router: Router, private storeService: StoreService) {

    window.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        console.log("APP resumed");
        window.location.reload();
      }
    });

    effect(() => {
      this.appPages = [];
      this.appPages.push({ title: 'Progreso', url: '/progreso', icon: 'bar-chart' });
      this.appPages.push({ title: 'Metas', url: '/metas', icon: 'ribbon' });
      this.appPages.push({ title: 'Transacciones', url: '/transacciones', icon: 'cash' });
      this.appPages.push({ title: 'Salir', url: '/inicio', icon: 'home' });

      if((this.storeService.userData()[0]?.ADMIN === 1 || this.storeService.userData()[0]?.ADMIN === 3) && this.appPages.find((page: any) => page.title === "Errores") === undefined) {
        this.appPages.splice(-1, 0, { title: 'Errores', url: '/fallas', icon: 'alert-circle' })
      }
      if(this.storeService.userData()[0]?.ADMIN > 0 && this.appPages.find((page: any) => page.title === "Personas") === undefined) {
        this.appPages.splice(-4, 0, { title: 'Personas', url: '/personas', icon: 'accessibility' })
      }
      if(this.storeService.userData()[0]?.LEADER && this.appPages.find((page: any) => page.title === "Área") === undefined) {
        const area: string = `/area/${ (storeService.userData()[0]?.ADMIN === 1 || storeService.userData()[0]?.ADMIN === 3) ? 'all' : storeService.userData()[0]?.LEADER}`
        this.appPages.splice(-1, 0, { title: 'Área', url: area, icon: 'people' })
      }
      if(this.storeService.userData()[0]?.ADMIN === 3 && this.appPages.find((page: any) => page.title === "Panel de Control") === undefined) {
        this.appPages.splice(-3, 0, { title: 'Panel de Control', url: '/panel', icon: 'construct' })
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
