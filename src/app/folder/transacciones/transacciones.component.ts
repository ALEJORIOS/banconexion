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

  allUsers: any = [];
  resultUser: any;

  openEditmodal: boolean = false;
  currentTransaction: any;

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

  constructor(private crudService: CrudService, private storeService: StoreService) { }

  public transactionsData: any = [];

  ngOnInit() {
    this.refresh();
    this.getUsers();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  refresh() {
    this.crudService.searchTransactions(this.storeService.userData()[0].ID).subscribe({
      next: (res) => {
        this.transactionsData = res;
      }
    })
  }

  getUsers() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
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
      next: (res) => {
        this.modal.dismiss(this.name, 'confirm');
      }
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.refresh();
    }
  }

  cleanModal() {

  }

  handleInput(event: any) {
    const nameQuery = event.target.value.toLowerCase();
    this.resultUser = this.allUsers.filter((d: any) => d.name.toLowerCase().indexOf(nameQuery) > -1);
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

  cleanEditModal() {

  }

  setEditOpen(open: boolean, transaction?: any) {
    if(transaction) this.currentTransaction = transaction;
    this.cleanEditModal();
    if(open && transaction.CONFIRMED === 0) {
      this.openEditmodal = true;
    }else{
      this.openEditmodal = false;
    }
    if(!this.openEditmodal) {
      this.refresh();
    }
  }
}
