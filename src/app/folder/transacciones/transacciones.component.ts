import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CrudService } from 'src/app/services/crud.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  documentType: FormControl = new FormControl("", Validators.required);
  documentNumber: FormControl = new FormControl("", Validators.required);
  value: FormControl = new FormControl(null, Validators.required);
  donation: FormControl = new FormControl(false, Validators.required);

  currentPhone: number = 0;

  allUsers: any = [];
  resultUser: any;

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
    }
  ]

  editAlertInputs: any = [
    {
      type: 'number',
      placeholder: "Valor",
      label: "Valor"
    }
  ]

  constructor(private crudService: CrudService, public storeService: StoreService) { }

  public transactionsData: any = [];

  ngOnInit() {
    this.refresh();
    this.getUsers();
    this.documentType.disable();
    this.documentNumber.disable();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.cleanModal();
  }

  refresh() {
    if(this.storeService.userData()[0].ADMIN === 3) {
      this.crudService.allTransactions().subscribe({
        next: (res) => {
          this.transactionsData = res;
        }
      })
    }else{
      this.crudService.searchTransactions(this.storeService.userData()[0].ID).subscribe({
        next: (res) => {
          this.transactionsData = res;
        }
      })
    }
  }

  getUsers() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
        this.resultUser = this.allUsers;
      }
    })
  }

  confirm() {
    const requestBody: any = {
      type: `${this.documentType.value}`,
      document: `${this.documentNumber.value}`,
      value: this.value.value,
      donation: this.donation.value ? 1 : 0,
      authorizedBy: {
        type: this.storeService.userData()[0].DOCUMENT_TYPE,
        document: this.storeService.userData()[0].DOCUMENT
      }
    }

    this.crudService.payment(requestBody).subscribe({
      next: () => {
        this.modal.dismiss(this.name, 'confirm');

        const text: string = `Se%20ha%20realizado%20un%20abono%20a%20tu%20nombre%20por%20un%20valor%20de%20%24${this.value.value}%20para%20conexi%C3%B3n%20divina%202024.%20Cada%20vez%20est%C3%A1s%20m%C3%A1s%20cerca%21`;
        window.open(`https://api.whatsapp.com/send/?phone=%2B57${this.currentPhone}&text=${text}&type=phone_number&app_absent=0`); 
      }
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.refresh();
      this.cleanModal();
    }
  }

  cleanModal() {
    this.documentType.setValue("");
    this.documentNumber.setValue("");
    this.currentPhone = 0;
  }

  handleInput(event: any) {
    const nameQuery = event.target.value.toLowerCase();
    this.resultUser = this.allUsers.filter((d: any) => d.NAME.toLowerCase().indexOf(nameQuery) > -1);
  }

  selectTransaction(id: number, confirmed: boolean) {
    if(this.storeService.userData()[0].ADMIN === 3 && confirmed === false) {
      if(this.selectedTransactions.includes(id)) {
        this.selectedTransactions = this.selectedTransactions.filter((tra: any) => tra !== id);
      }else{
        this.selectedTransactions.push(id);
      }
    }
  }

  selectName() {

  }

  donationState(event: Event) {
    this.donation.setValue((event as CustomEvent).detail.checked);
  }

  donationEditState(event: Event) {
    this.currentTransaction.DONATION = (event as CustomEvent).detail.checked ? 1 : 0;
  }

  selectPerson(person: any) {
    this.documentType.setValue(person.DOCUMENT_TYPE);
    this.documentNumber.setValue(person.DOCUMENT);
    this.currentPhone = person.PHONE;
  }

  edit() {
    const requestBody: any = {
      value: this.currentTransaction.VALUE,
      donation: this.currentTransaction.DONATION
    }
    this.crudService.editTransaction(this.currentTransaction.ID, requestBody).subscribe({
      next: () => {
        this.refresh();
        this.setEditOpen(false);
      }
    })
  }

  setEditOpen(open: boolean, transaction?: any) {
    if(transaction) this.currentTransaction = transaction;
    if(open && transaction.CONFIRMED === 0) {
      this.openEditmodal = true;
    }else{
      this.openEditmodal = false;
    }
    if(!this.openEditmodal) {
      this.refresh();
      this.selectedTransactions = [];
    }
  }

  confirmTransactions() {
    this.crudService.approveTransactions(this.selectedTransactions).subscribe({
      next: () => {
        this.refresh();
        this.selectedTransactions = [];
      }
    })
  }
}
