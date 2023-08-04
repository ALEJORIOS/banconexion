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

  constructor(private crudService: CrudService, private storeService: StoreService) { }

  public peopleData: any = [];

  public resultPeople: any;

  ngOnInit() {
    this.crudService.searchAllUsers().subscribe({
      next: (res) => {
        this.peopleData = res;
        this.resultPeople = this.peopleData;
      }
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    console.log('>> ', this.storeService.userData())
    const requestBody: any = {
      type: `${this.documentType.value}`,
      document: `${this.documentNumber.value}`,
      value: this.value.value,
      donation: 0,
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
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  

  handleInput(event: any) {
    const nameQuery = event.target.value.toLowerCase();
    this.resultPeople = this.peopleData.filter((d: any) => d.name.toLowerCase().indexOf(nameQuery) > -1);
  }

  selectName() {

  }

  donationState(event: Event) {
    this.donation.setValue((event as CustomEvent).detail.checked);
  }

  selectPerson(person: any) {
    this.documentType.setValue(person.DOCUMENT_TYPE);
    this.documentNumber.setValue(person.DOCUMENT);
  }

}
