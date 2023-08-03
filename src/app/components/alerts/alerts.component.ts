import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent  implements OnInit {

  @Input("type") type: "error" | "warning" | "info" | "success" = "error";
  
  constructor() { }

  ngOnInit() {}

}

export class AlertsMethods {
  private _message: string = "";
  private _type: "error" | "warning" | "info" | "success" = "error";
  private _show: boolean = false;

  constructor() {}

  public get message(): string {
    return this._message;
  }

  public set message(newMessage) {
    this._message = newMessage;
  }
  
  public get type(): "error" | "warning" | "info" | "success" {
    return this._type;
  }

  public set type(newType) {
    this._type = newType;
  }

  public get show(): boolean {
    return this._show;
  }

  public set show(newVisibility) {
    this._show = newVisibility;
  }
}