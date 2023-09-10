import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  alertMessage: string = "";
  document = new FormControl("", Validators.required);
  type = new FormControl("", Validators.required);
  password = new FormControl("");
  enableButton: boolean = true;
  showLoadingText: boolean = false;
  maintenance: boolean | null = null;
  enableAdmin: boolean = false;
  saveAdminData: any;

  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;

  constructor(private crudService: CrudService, private storeService: StoreService, private router: NavController) { }

  ionViewDidEnter() {
    localStorage.removeItem("userData");
    this.storeService.userData.set([]);
    this.crudService.checkMaintenance()
    .pipe(map(res => {
      return res[0].VALUE === "1" ? true : false
    }))
    .subscribe({
      next: (res) => {
        this.maintenance = res;
      },
      error: () => {
        this.alertMessage = "Ocurrió un error inesperado";
        this.errorToast.present();
        this.maintenance = true;
        console.error("Ocurrió un error al intentar verificar si la aplicación está en mantenimiento");
      }
    })
  }

  login(): void {
    this.saveAdminData = [];
    this.showLoadingText = true;
    this.enableButton = false;
    this.errorToast.dismiss();
    if(this.maintenance !== null) {
      if(this.maintenance) {
        this.alertMessage = "Estamos en mantenimiento, intente nuevamente más tarde";
        this.errorToast.present();
        this.showLoadingText = false;
        this.enableButton = true;
      }else{
        if(this.checkError()) {
          this.crudService.searchDocument(this.document.value || "", this.type.value || "").subscribe({
            next: (res) => {
              if(res.length === 0) {
                this.showLoadingText = false;
                this.enableButton = true;
                this.alertMessage = "Documento incorrecto"
                this.errorToast.present();
              }else{
                if(res[0].ADMIN > 0) {
                  this.enableAdmin = true;
                  this.enableButton = true;
                  this.showLoadingText = false;
                  this.saveAdminData = res;
                }else{
                  this.enableAdmin = false;
                  this.storeService.userData.set(res);
                  localStorage.setItem("userData", JSON.stringify(res));
                  this.router.navigateRoot(["/progreso"]);
                }
              }
            },
            error: (err) => {
              console.error("Ocurrió un error: ", err);
              this.alertMessage = "Ocurrió un error, intente nuevamente";
              this.errorToast.present();
              this.showLoadingText = false;
              this.enableButton = true;
            }
          })
        };
      }
    }else{
      setTimeout(() => {
        this.login();
      }, 100);
    }
  }

  loginAdmin() {
    this.showLoadingText = true;
    this.enableButton = false;
    const requestBody: any = {
      document: this.document.value,
      type: this.type.value,
      password: this.password.value
    }
    this.crudService.loginAdmin(requestBody).subscribe({
      next: () => {
        this.storeService.userData.set(this.saveAdminData);
        localStorage.setItem("userData", JSON.stringify(this.saveAdminData));
        this.router.navigateRoot(["/progreso"]);
        this.showLoadingText = false;
        this.enableButton = true;
      },
      error: () => {
        this.alertMessage = "Contraseña incorrecta";
        this.errorToast.present();
        this.showLoadingText = false;
        this.enableButton = true;
      }
    })
  }
  
  checkError(): boolean {
    if(this.document.invalid) {
      this.alertMessage = "Introduza su número de documento";
      this.errorToast.present();
      this.showLoadingText = false;
      this.enableButton = true;
      return false;
    }else if(this.type.invalid) {
      this.alertMessage = "Seleccione su tipo de documento";
      this.errorToast.present();
      this.showLoadingText = false;
      this.enableButton = true;
      return false;
    }else{
      return true;
    }
  } 
}