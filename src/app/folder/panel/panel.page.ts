import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.page.html',
    styleUrls: ['./panel.page.scss'],
    standalone: false
})
export class PanelPage implements OnInit {

  constructor(private crudService: CrudService) { }

  loadingState: boolean = false;

  ngOnInit() {
  }

  exportReport() {
    this.loadingState = true;
    this.crudService.exportReport().subscribe({
      next: (res) => {
        this.downloadFile(res, "Reporte.xlsx");
        this.loadingState = false;
      },
      error: (err) => {
        this.loadingState = false;
      }
    })
  }

  exportTransactions() {
    this.loadingState = true;
    this.crudService.exportTransactions().subscribe({
      next: (res) => {
        this.downloadFile(res, "Transacciones.xlsx");
        this.loadingState = false;
      },
      error: (err) => {
        this.loadingState = false;
      }
    })
  }

  downloadFile(data: any, fileName: string) {
    const type = data.body?.type;
    const file = new File([data.body!], fileName, { type });
    const fileReader = new FileReader();
    fileReader.addEventListener(
      "load", () => {        
        const aElement = document.createElement("a")
        aElement.href = fileReader.result as string;
        aElement.download = fileName || "File"; 
        aElement.target = "_blank"
        aElement.click();
      }
    )
    fileReader.readAsDataURL(file);
  }
}
