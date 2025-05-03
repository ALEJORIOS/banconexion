import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'percentPipe',
	standalone: true,
})
export class PercentPipe implements PipeTransform {
	transform(value: number): unknown {
		return value ? (value * 100).toFixed(0) + '%' : '0%';
	}
}
