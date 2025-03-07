import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pbar',
    templateUrl: './pbar.component.html',
    styleUrls: ['./pbar.component.scss'],
    standalone: false
})
export class PbarComponent  implements OnInit {

  @Input("value") value: number = 0;
  @Input("confirmed") confirmed: number = 0;
  
  constructor() { }

  ngOnInit() {}

}
