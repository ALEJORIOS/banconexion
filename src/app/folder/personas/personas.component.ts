import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
})
export class PersonasComponent implements OnInit {
  campersData: any = [];
  filteredCampersData: any = [];
  alertMessage: string = '';
  filterText: string = '';
  icon: string = '';
  editModalOpen: boolean = false;
  termsModalOpen: boolean = false;
  currentCampist: any;

  // Relation User
  relationModalOpen: boolean = false;
  relationMode: boolean = false;
  checkedRelations: number[] = [];
  enableRelations: boolean = false;

  @ViewChild('errorToast') errorToast!: HTMLIonToastElement;
  @ViewChild(IonModal) modal!: IonModal;

  // New User
  newUser = this.fb.group({
    documentType: ['', Validators.required],
    document: ['', Validators.required],
    name: ['', Validators.required],
    birth: ['', Validators.required],
    phone: [null, Validators.required],
    transport: [true],
    area: ['', Validators.required],
    agreeTerms: [false],
    guest: [0]
  });

  // Edit User
  editUser = this.fb.group({
    documentType: ['', Validators.required],
    document: ['', Validators.required],
    name: ['', Validators.required],
    birth: ['', Validators.required],
    phone: [0, Validators.required],
    transport: [true],
    area: ['', Validators.required],
    admin: [0],
    password: ['']
  });

  constructor(
    private crudService: CrudService,
    private fb: FormBuilder,
    public storeService: StoreService
  ) { }

  ngOnInit() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.campersData = res;
        this.filteredCampersData = this.campersData.sort((a: any, b: any) => {
          const nameA = a.NAME.toUpperCase();
          const nameB = b.NAME.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      },
      error: (err) => {
        console.error(err);
        this.icon = 'close-circle-outline';
        this.alertMessage = 'Ocurrió un error cargando los datos';
        this.errorToast.present();
      },
    });
  }

  refresh() {
    this.filterText = '';
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.campersData = res;
        this.filteredCampersData = this.campersData;
      },
      error: (err) => {
        console.error(err);
        this.icon = 'close-circle-outline';
        this.alertMessage = 'Ocurrió un error cargando los datos';
        this.errorToast.present();
      },
    });
  }

  // Modal Crear Usuario

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.errorToast.dismiss();
    if (await this.checkErrors()) {
      const age: number =
        Math.floor((new Date().getTime() -
          new Date(
            `${this.newUser.controls.birth.value}T00:00:00.000-05:00`
          ).getTime()) /
          (1000 * 3600 * 24 * 365));
      const requestBody: any = {
        name: this.newUser.controls.name.value?.toUpperCase(),
        age: age,
        birth: `${this.newUser.controls.birth.value}`,
        phone: `${this.newUser.controls.phone.value}`,
        transport: this.newUser.controls.transport.value ? 1 : 0,
        type: this.newUser.controls.documentType.value,
        document: `${this.newUser.controls.document.value}`,
        area: this.newUser.controls.area.value,
        guest: this.newUser.controls.guest.value,
        registered_by: this.storeService.userData()[0].ID,
      };
      this.crudService.register(requestBody).subscribe({
        next: () => {
          this.modal.dismiss(null, 'register');
          this.icon = 'checkmark-circle-outline';
          this.alertMessage = 'Usuario registrado correctamente';
          this.errorToast.present();
        },
        error: (err) => {
          console.error(err);
          this.icon = 'close-circle-outline';
          this.alertMessage =
            'Ocurrió un error al intentar registrar este usuario';
          this.errorToast.present();
        },
      });
    }
  }

  openTerms() {
    this.termsModalOpen = true;
  }

  closeTerms() {
    this.errorToast.dismiss();
    this.termsModalOpen = false;
  }

  confirmEdition() {
    this.errorToast.dismiss();
    if (this.checkEditionErrors()) {
      const age: number =
        Math.floor((new Date().getTime() -
          new Date(
            `${this.editUser.controls.birth.value}T00:00:00.000-05:00`
          ).getTime()) /
          (1000 * 3600 * 24 * 365));
      const requestBody: any = {
        name: this.editUser.controls.name.value?.toUpperCase(),
        type: this.editUser.controls.documentType.value,
        document: `${this.editUser.controls.document.value}`,
        age: age,
        birth: this.editUser.controls.birth.value,
        transport: this.editUser.controls.transport.value ? 1 : 0,
        area: this.editUser.controls.area.value,
        phone: `${this.editUser.controls.phone.value}`,
        admin: this.editUser.controls.admin.value,
        password: this.editUser.controls.password.value,
      };
      this.crudService.edit(requestBody, this.currentCampist.ID).subscribe({
        next: () => {
          this.icon = 'checkmark-circle-outline';
          this.alertMessage = 'Usuario editado correctamente';
          this.errorToast.present();
          this.setEditOpen(false);
        },
        error: (err) => {
          console.error(err);
          this.icon = 'close-circle-outline';
          this.alertMessage =
            'Ocurrió un error al intentar editar este usuario';
          this.errorToast.present();
        },
      });
    }
  }

  cleanModal() {
    this.newUser.setValue({
      name: '',
      documentType: '',
      document: '',
      birth: '',
      phone: null,
      transport: true,
      area: '',
      agreeTerms: false,
      guest: 0
    });
  }

  cleanRelationModal() { }

  cleanEditModal() {    
    const areaEquivalent: any = {
      ALABANZA: 'ALB',
      CRECIMIENTO: 'CRE',
      CONSOLIDACIÓN: 'CON',
      DIACONADO: 'DIA',
      'GRANJA DE PAPÁ': 'GDP',
      INTERCESIÓN: 'INT',
      JÓVENES: 'JCR',
      MATRIMONIOS: 'MAT',
      PROTEMPLO: 'PRO',
      ASISTENTES: 'AST',
    };
    areaEquivalent.key;
    this.editUser.setValue({
      name: this.currentCampist.NAME,
      documentType: this.currentCampist.DOCUMENT_TYPE,
      document: this.currentCampist.DOCUMENT,
      birth: this.currentCampist.BIRTH,
      phone: this.currentCampist.PHONE,
      transport: this.currentCampist.TRANSPORT === 1,
      area: areaEquivalent[this.currentCampist.AREA],
      admin: this.currentCampist.ADMIN,
      password: ''
    });
  }

  async checkErrors(): Promise<boolean> {
    this.errorToast.dismiss();
    this.icon = 'close-circle-outline';
    if (!this.newUser.controls.agreeTerms.value) {
      this.alertMessage =
        'Es necesario aceptar los términos y condiciones para continuar';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.area.invalid) {
      this.alertMessage = 'El área es obligatoria';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.document.invalid) {
      this.alertMessage = 'El documento es obligatorio';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.documentType.invalid) {
      this.alertMessage = 'El tipo de documento es obligatorio';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.name.invalid) {
      this.alertMessage = 'El nombre es obligatorio';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.birth.invalid) {
      this.alertMessage = 'La fecha de nacimiento es obligatoria';
      this.errorToast.present();
      return false;
    }
    if (this.newUser.controls.phone.invalid) {
      this.alertMessage = 'El número de celular es obligatorio';
      this.errorToast.present();
      return false;
    }
    try {
      const user = await (await firstValueFrom(this.crudService.searchDocument(this.newUser.controls.document.value!, this.newUser.controls.documentType.value!)))[0];
      if (user) {
        this.alertMessage = 'Este documento ya está registrado';
        this.errorToast.present();
        return false;
      }
    }
    catch {
      return true;
    }
    return true;
  }

  checkEditionErrors(): boolean {
    let result: boolean = true;
    this.errorToast.dismiss();
    this.icon = 'close-circle-outline';
    if (this.editUser.controls.area.invalid) {
      this.alertMessage = 'El área es obligatoria';
      this.errorToast.present();
      result = false;
    }
    if (this.editUser.controls.document.invalid) {
      this.alertMessage = 'El documento es obligatorio';
      this.errorToast.present();
      result = false;
    }
    if (this.editUser.controls.documentType.invalid) {
      this.alertMessage = 'El tipo de documento es obligatorio';
      this.errorToast.present();
      result = false;
    }
    if (this.editUser.controls.name.invalid) {
      this.alertMessage = 'El nombre es obligatorio';
      this.errorToast.present();
      result = false;
    }
    if (this.editUser.controls.phone.invalid) {
      this.alertMessage = 'El número de celular es obligatorio';
      this.errorToast.present();
      result = false;
    }
    if (this.editUser.controls.birth.invalid) {
      this.alertMessage = 'La fecha de nacimiento es obligatoria';
      this.errorToast.present();
      result = false;
    }
    return result;
  }

  onWillDismiss(event: Event) {
    if ((event as CustomEvent).detail.role === 'register') {
      this.refresh();
    }
  }

  selectCampistRelation(campist: any) {
    if (this.relationMode) {
      this.setRelationOpen(true, campist);
    }
  }

  setRelationMode() {
    this.relationMode = !this.relationMode;
  }

  setRelationOpen(open: boolean, campist?: any) {
    this.relationModalOpen = open;
    if (campist) this.currentCampist = campist;
    this.cleanRelationModal();
    if (!this.relationModalOpen) {
      this.refresh();
    } else {
      this.checkedRelations = [];
      this.enableRelations = false;
      this.crudService
        .getRelations(
          this.currentCampist.DOCUMENT,
          this.currentCampist.DOCUMENT_TYPE
        )
        .subscribe({
          next: (res) => {
            this.enableRelations = true;
            this.checkedRelations = res.map((user: any) => user.id);
          },
        });
    }
  }

  setEditOpen(open: boolean, campist?: any) {
    this.editModalOpen = open;
    if (campist) this.currentCampist = campist;
    this.cleanEditModal();
    if (!this.editModalOpen) {
      this.refresh();
    }
  }

  changeRelationCheck(evn: Event, id: number) {
    const status: any = (evn.target as any).checked;
    if (status) {
      this.checkedRelations.push(id);
    } else {
      this.checkedRelations = this.checkedRelations.filter(
        (userId) => userId !== id
      );
    }
  }

  updateRelations(parentId: number) {
    this.crudService
      .updateRelations(parentId, this.checkedRelations)
      .subscribe({
        next: (res) => {
          this.setRelationOpen(false);
        },
      });
  }

  updateCampist(event: Event) {
    const evn: string = (event.target as HTMLInputElement).value.toUpperCase();
    this.filteredCampersData = this.campersData.filter((camper: any) => {
      return camper.NAME.indexOf(evn) !== -1;
    });
  }
}
