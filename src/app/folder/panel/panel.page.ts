import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  constructor(private crudService: CrudService) { }

  ngOnInit() {
  }

  exportReport() {
    console.log(2)
    this.crudService.exportReport().subscribe({
      next: (res) => {
        this.downloadFile(res);
      }
    })
  }

  exportTransactions() {
    console.log(1)
    this.crudService.exportTransactions().subscribe({
      next: (res) => {
        this.downloadFile(res);
      }
    })
  }

  downloadFile(data: any) {
    console.log("Entra a descargar")
    let fileName = data.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
    let blob:Blob = data.body as Blob;
    console.log('>>> ', blob)
    let a = document.createElement('a');
    a.download=fileName;
    a.href=window.URL.createObjectURL(blob);
    a.click();
  }
}
