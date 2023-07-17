import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
    { title: 'Transacciones', url: '/transacciones', icon: 'cash' }
  ];

  currentFolder: string = "";

  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
        console.log('URL: ', (event as NavigationEnd).urlAfterRedirects);
        this.currentFolder = (event as NavigationEnd).urlAfterRedirects.substring(1)
    })
}
}
