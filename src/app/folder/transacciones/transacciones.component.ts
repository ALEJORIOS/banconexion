import { Component, OnInit, ViewChild } from '@angular/core';
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

  public data = [
    'Nicole',
    'Alejandro',
    'Sebastian',
    'Luisa',
    'Sofía',
    'Diego',
    'Laura',
    'Luis Ángel',
    'Germán',
    'Sofía',
    'Luna',
    'Arturo',
    'Viviana',
    'Wilson',
    'Zaira'
  ];

  public results = [...this.data];

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

}
