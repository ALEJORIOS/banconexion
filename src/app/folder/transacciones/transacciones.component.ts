import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { firstValueFrom } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
  standalone: false,
})
export class TransaccionesComponent implements OnInit {
  @ViewChild('errorToast') errorToast!: HTMLIonToastElement;
  @ViewChild(IonModal) modal!: IonModal;
  flashClass: string = '';
  alertMessage: string = '';
  icon: string = '';
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';

  documentType: FormControl = new FormControl('', Validators.required);
  documentNumber: FormControl = new FormControl('', Validators.required);
  value: FormControl = new FormControl('', Validators.required);
  donation: FormControl = new FormControl(false, Validators.required);
  currentName: string = '';

  currentPhone: string = '';

  allUsers: any = [];
  resultUser: any;

  openCreateModal: boolean = false;
  openEditmodal: boolean = false;
  currentTransaction: any;

  selectedTransactions: any = [];

  editAlertButtons: any = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Editar',
      role: 'confirm',
    },
  ];

  editAlertInputs: any = [
    {
      type: 'number',
      placeholder: 'Valor',
      label: 'Valor',
    },
  ];

  constructor(
    private crudService: CrudService,
    public storeService: StoreService,
    private titleCase: TitleCasePipe
  ) {}

  public transactionsData: any = [];

  ngOnInit() {
    this.refresh();
    this.getUsers();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.openCreateModal = false;
    this.cleanModal();
  }

  refresh() {
    if (this.storeService.userData()[0].ADMIN === 3) {
      this.crudService.allTransactions().subscribe({
        next: (res) => {
          this.transactionsData = res;
        },
      });
    } else {
      this.crudService
        .searchTransactions(this.storeService.userData()[0].ID)
        .subscribe({
          next: (res) => {
            this.transactionsData = res;
          },
        });
    }
  }

  getUsers() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
        this.resultUser = this.allUsers.sort((a: any, b: any) => {
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
    });
  }

  checkTransaction() {
    this.errorToast.dismiss();
    if (!this.documentType.value) {
      this.icon = 'close-circle-outline';
      this.alertMessage = 'El tipo de documento es obligatorio';
      this.errorToast.present();
      return false;
    } else if (!this.documentNumber.value) {
      this.icon = 'close-circle-outline';
      this.alertMessage = 'El número de documento es obligatorio';
      this.errorToast.present();
      return false;
    } else if (!this.value.value) {
      this.icon = 'close-circle-outline';
      this.alertMessage = 'El valor es requerido';
      this.errorToast.present();
      return false;
    } else {
      this.errorToast.dismiss();
      return true;
    }
  }

  async checkLeft() {
    const realValue: number = +this.value.value.replace(/\./g, '');
    const diff = await this.difference(realValue);
    if (diff < 0) {
      this.icon = 'close-circle-outline';
      this.alertMessage =
        'El valor de esta transacción excede el valor del campamento por $' +
        diff * -1 +
        ' pesos';
      this.errorToast.present();
    }
    return diff >= 0;
  }

  async difference(payment: number): Promise<number> {
    let user: any;
    try {
      user = await (
        await firstValueFrom(
          this.crudService.searchDocument(
            this.documentNumber.value,
            this.documentType.value
          )
        )
      )[0];
      return user.GOAL - (+user.BALANCE + payment);
    } catch {
      this.icon = 'close-circle-outline';
      this.alertMessage =
        'Ocurrió un error al intentar consultar este registro';
      this.errorToast.present();
      return -1;
    }
  }

  openCreateTransactions() {
    this.openCreateModal = true;
  }

  formatValue() {
    const stringValue: String = String(this.value.value);
    const removeChars: String = stringValue.replace(/[^0-9\.]/g, '');
    const withoutDots = removeChars.replace(/\./g, '');
    const formatted = withoutDots.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.value.setValue(formatted);
  }

  async confirm() {
    if (!this.checkTransaction()) {
      return;
    }
    if (await this.checkLeft()) {
      const value = +this.value.value.replace(/\./g, '');
      const requestBody: any = {
        type: `${this.documentType.value}`,
        document: `${this.documentNumber.value}`,
        value: value,
        donation: this.donation.value ? 1 : 0,
        authorizedBy: {
          type: this.storeService.userData()[0].DOCUMENT_TYPE,
          document: this.storeService.userData()[0].DOCUMENT,
        },
      };
      this.crudService.payment(requestBody).subscribe({
        next: async () => {
          if ((await this.difference(value)) + value === 0) {
            const text: string = `¡Bienvenid@ ${this.titleCase.transform(
              this.currentName
            )} a Conexión Divina 2025! 🥳🥳🥳 Nos vemos este 16 de agosto`;
            window.open(
              `https://api.whatsapp.com/send/?phone=%2B57${this.currentPhone}&text=${text}&type=phone_number&app_absent=0`
            );
          } else {
            const text: string = `Hola ${this.currentName},se ha realizado un abono a tu nombre por un valor de ${this.value.value} para Conexión Divina 2025. ¡Cada vez estás más cerca!`;
            window.open(
              `https://api.whatsapp.com/send/?phone=%2B57${this.currentPhone}&text=${text}&type=phone_number&app_absent=0`
            );
          }
          this.modal.dismiss(this.name, 'confirm');
        },
        error: () => {
          this.icon = 'close-circle-outline';
          this.alertMessage = 'No se pudo realizar la transacción';
          this.errorToast.present();
        },
      });
    } else {
      return;
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.refresh();
      this.cleanModal();
    }
    this.openCreateModal = false;
  }

  cleanModal() {
    this.documentType.setValue('');
    this.documentNumber.setValue('');
    this.value.setValue(0);
    this.currentPhone = '';
  }

  handleInput(event: any) {
    const nameQuery = event.target.value.toLowerCase();
    this.resultUser = this.allUsers.filter(
      (d: any) => d.NAME.toLowerCase().indexOf(nameQuery) > -1
    );
  }

  selectTransaction(id: number, confirmed: boolean) {
    if (this.storeService.userData()[0].ADMIN === 3 && confirmed === false) {
      if (this.selectedTransactions.includes(id)) {
        this.selectedTransactions = this.selectedTransactions.filter(
          (tra: any) => tra !== id
        );
      } else {
        this.selectedTransactions.push(id);
      }
    }
  }

  donationState(event: Event) {
    this.donation.setValue((event as CustomEvent).detail.checked);
  }

  donationEditState(event: Event) {
    this.currentTransaction.DONATION = (event as CustomEvent).detail.checked
      ? 1
      : 0;
  }

  selectPerson(person: any) {
    this.documentType.setValue(person.DOCUMENT_TYPE);
    this.documentNumber.setValue(person.DOCUMENT);
    this.currentPhone = person.PHONE;
    this.currentName = person.NAME;
    this.flashClass = 'flash';
  }

  edit() {
    const requestBody: any = {
      value: this.currentTransaction.VALUE,
      donation: this.currentTransaction.DONATION,
    };
    this.crudService
      .editTransaction(this.currentTransaction.ID, requestBody)
      .subscribe({
        next: () => {
          this.refresh();
          this.setEditOpen(false);
        },
      });
  }

  setEditOpen(open: boolean, transaction?: any) {
    if (transaction) this.currentTransaction = transaction;
    if (open && transaction.CONFIRMED === 0) {
      this.openEditmodal = true;
    } else {
      this.openEditmodal = false;
    }
    if (!this.openEditmodal) {
      this.refresh();
      this.selectedTransactions = [];
    }
  }

  confirmTransactions() {
    this.crudService.approveTransactions(this.selectedTransactions).subscribe({
      next: () => {
        this.refresh();
        this.selectedTransactions = [];
      },
    });
  }
}
