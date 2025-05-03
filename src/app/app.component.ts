import { Component, OnInit, effect } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { StoreService } from './services/store.service';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages: any = [];

  currentFolder: string = '';

  constructor(
    router: Router,
    private storeService: StoreService,
    private platform: Platform
  ) {
    this.initializeApp();
    window.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        console.log('APP resumed');
        window.location.reload();
      }
    });

    effect(() => {
      this.appPages = [];
      this.appPages.push({
        title: 'Progreso',
        url: '/progreso',
        icon: 'bar-chart',
      });
      this.appPages.push({ title: 'Tarifas', url: '/metas', icon: 'ribbon' });
      this.appPages.push({
        title: 'Abonos',
        url: '/transacciones',
        icon: 'cash',
      });
      this.appPages.push({ title: 'Salir', url: '/inicio', icon: 'home' });

      if (
        (this.storeService.userData()[0]?.ADMIN === 1 ||
          this.storeService.userData()[0]?.ADMIN === 3) &&
        this.appPages.find((page: any) => page.title === 'Errores') ===
          undefined
      ) {
        this.appPages.splice(-1, 0, {
          title: 'Errores',
          url: '/fallas',
          icon: 'alert-circle',
        });
      }
      if (
        this.storeService.userData()[0]?.ADMIN > 0 &&
        this.appPages.find((page: any) => page.title === 'Listado General') ===
          undefined
      ) {
        this.appPages.splice(-4, 0, {
          title: 'Listado General',
          url: '/listado-general',
          icon: 'accessibility',
        });
      }
      console.log('?> ', this.storeService.userData()[0]);
      if (
        (this.storeService.userData()[0]?.LEADER ||
          this.storeService.userData()[0]?.ADMIN === 3) &&
        this.appPages.find((page: any) => page.title === 'Área') === undefined
      ) {
        console.log('Entra aquí perfectamente');
        const area: string = `/area/${
          storeService.userData()[0]?.ADMIN === 1 ||
          storeService.userData()[0]?.ADMIN === 3
            ? 'all'
            : storeService.userData()[0]?.LEADER
        }`;
        this.appPages.splice(-1, 0, {
          title: 'Áreas',
          url: area,
          icon: 'people',
        });
      }
      if (
        this.storeService.userData()[0]?.ADMIN === 3 &&
        this.appPages.find((page: any) => page.title === 'Reportes') ===
          undefined
      ) {
        this.appPages.splice(-3, 0, {
          title: 'Descargar Reporte',
          url: '/panel',
          icon: 'document',
        });
      }
    });
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentFolder = (
          event as NavigationEnd
        ).urlAfterRedirects.substring(1);
      });
    if (localStorage.getItem('userData')) {
      storeService.userData.set(
        JSON.parse(localStorage.getItem('userData') || '')
      );
    }
  }

  async initializeApp() {
    await this.platform.ready();
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  }
}
