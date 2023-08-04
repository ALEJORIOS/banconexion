import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsMethods } from './../../components/alerts/alerts.component';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  alert = new AlertsMethods();
  document = new FormControl("", Validators.required);
  type = new FormControl("", Validators.required);
  enableButton: boolean = true;
  showLoadingText: boolean = false;

  constructor(private crudService: CrudService, private router: Router, private storeService: StoreService) { }

  ngOnInit() {}

  login(): void {
    this.cleanAlert();
    this.showLoadingText = true;
    this.enableButton = false;
    if(this.checkError()) {
      this.crudService.searchDocument(this.document.value || "", this.type.value || "").subscribe({
        next: (res) => {
          this.storeService.userData.set(res);
          localStorage.setItem("userData", JSON.stringify(res));
          this.router.navigate(["progreso"]);
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      })
    };
  }
  
  checkError(): boolean {
    if(this.document.invalid) {
      this.alert.message = "Introduza su número de documento";
      this.alert.type = "error";
      this.alert.show = true;
      this.showLoadingText = false;
      this.enableButton = true;
      return false;
    }else if(this.type.invalid) {
      this.alert.message = "Seleccione su tipo de documento";
      this.alert.type = "error";
      this.alert.show = true;
      this.showLoadingText = false;
      this.enableButton = true;
      return false;
    }else{
      return true;
    }
  }
  
  cleanAlert() {
    this.alert.show = false;
  }

}
