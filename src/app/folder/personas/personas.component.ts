import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
})
export class PersonasComponent  implements OnInit {

  campersData: any = [];
  alertMessage: string = "";
  icon: string = "";
  @ViewChild("errorToast") errorToast!: HTMLIonToastElement;
  @ViewChild(IonModal) modal!: IonModal;

  // Nuevo Usuario
  newUser = this.fb.group({
    documentType: ['', Validators.required],
    document: ['', Validators.required],
    name: ['', Validators.required],
    age: [null],
    phone: [null, Validators.required],
    transport: [true],
    area: ['', Validators.required],
    agreeTerms: [false],
    guest: [0]
  })

  constructor(private crudService: CrudService, private fb: FormBuilder, private storeService: StoreService) { }

  ngOnInit() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.campersData = res;
      },
      error: (err) => {
        console.error(err);
        this.icon = "close-circle-outline";
        this.alertMessage = "Ocurrió un error cargando los datos";
        this.errorToast.present();
      }
    })
  }

  refresh() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.campersData = res;
      },
      error: (err) => {
        console.error(err);
        this.icon = "close-circle-outline";
        this.alertMessage = "Ocurrió un error cargando los datos";
        this.errorToast.present();
      }
    })
  }

  // Modal Crear Usuario

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.errorToast.dismiss();
    console.log('>>> ', this.storeService.userData());
    if(this.checkErrors()) {
      const requestBody: any = {
        name: this.newUser.controls.name.value?.toUpperCase(),
        age: this.newUser.controls.age.value,
        phone: `${this.newUser.controls.phone.value}`,
        transport: this.newUser.controls.transport.value ? 1 : 0,
        type: this.newUser.controls.documentType.value,
        document: `${this.newUser.controls.document.value}`,
        area: this.newUser.controls.area.value,
        guest: this.newUser.controls.guest.value,
        registered_by: this.storeService.userData()[0].ID
      }
      this.crudService.register(requestBody).subscribe({
        next: (res) => {
          this.modal.dismiss(null, "register");
          this.icon = "checkmark-circle-outline";
          this.alertMessage = "Usuario registrado correctamente";
          this.errorToast.present();
        },
        error: (err) => {
          console.error(err);
          this.icon = "close-circle-outline";
          this.alertMessage = "Ocurrió un error al intentar registrar este usuario";
          this.errorToast.present();
        }
      })
    }
  }

  cleanModal() {
    this.newUser.setValue({
      name: "",
      documentType: "",
      document: "",
      age: null,
      phone: null,
      transport: true,
      area: "",
      agreeTerms: false,
      guest: 0
    })
  }

  checkErrors(): boolean {
    let result: boolean = true;
    this.errorToast.dismiss();
    this.icon = "close-circle-outline";
    if(!this.newUser.controls.agreeTerms.value) {
      this.alertMessage = "Es necesario aceptar los términos y condiciones para continuar"
      this.errorToast.present();
      result = false;
    }
    if(this.newUser.controls.area.invalid) {
      this.alertMessage = "El área es obligatoria"
      this.errorToast.present();
      result = false;
    } 
    if(this.newUser.controls.document.invalid) {
      this.alertMessage = "El documento es obligatorio"
      this.errorToast.present();
      result = false;
    } 
    if(this.newUser.controls.documentType.invalid) {
      this.alertMessage = "El tipo de documento es obligatorio"
      this.errorToast.present();
      result = false;
    } 
    if(this.newUser.controls.name.invalid) {
      this.alertMessage = "El nombre es obligatorio"
      this.errorToast.present();
      result = false;
    }
    if(this.newUser.controls.phone.invalid) {
      this.alertMessage = "El número de celular es obligatorio"
      this.errorToast.present();
      result = false;
    }
    return result;
  }

  onWillDismiss(event: Event) {
    if((event as CustomEvent).detail.role === "register") {
      this.refresh();
    }
  }
}