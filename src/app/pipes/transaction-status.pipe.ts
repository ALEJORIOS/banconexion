import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Status',
  standalone: true
})
export class TransactionStatusPipe implements PipeTransform {

  transform(value: number): string {
    if(value === 0) {
      return "Sin Confirmar";
    }else if(value === 1) {
      return "Confirmado"
    }else {
      return "Error"
    }
  }

}
