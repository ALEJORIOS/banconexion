import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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

  constructor() { }

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  public peopleData = [
    {name: 'Nicole', document: 10, type: "CC"},
    {name: 'Alejandro', document: 10, type: "CC"},
    {name: 'Sebastian', document: 10, type: "CC"},
    {name: 'Luisa', document: 10, type: "CC"},
    {name: 'Sofía', document: 10, type: "CC"},
    {name: 'Diego', document: 10, type: "CC"},
    {name: 'Laura', document: 10, type: "CC"},
    {name: 'Luis Ángel', document: 10, type: "CC"},
    {name: 'Germán', document: 10, type: "CC"},
    {name: 'Sofía', document: 10, type: "CC"},
    {name: 'Luna', document: 10, type: "CC"},
    {name: 'Arturo', document: 10, type: "CC"},
    {name: 'Viviana', document: 10, type: "CC"},
    {name: 'Wilson', document: 10, type: "CC"},
    {name: 'Zaira', document: 10, type: "CC"}
  ];

  public resultPeople: any = this.peopleData;

  handleInput(event: any) {
    const nameQuery = event.target.value.toLowerCase();
    this.resultPeople = this.peopleData.filter((d) => d.name.toLowerCase().indexOf(nameQuery) > -1);
  }

  selectName() {

  }

  donationState(event: Event) {
    this.donation.setValue((event as CustomEvent).detail.checked);
  }

}
