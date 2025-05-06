import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'pbar',
	templateUrl: './pbar.component.html',
	styleUrls: ['./pbar.component.scss'],
	standalone: false,
})
export class PbarComponent implements OnInit {
	@Input('value') value: number = 0;
	@Input('confirmed') confirmed: number = 0;

	constructor() {}

	ngOnInit() {}

	progressLabel(value: number) {
		if (value <= 0) return '¡Tú puedes!';
		if (value > 0 && value < 25) return '¡Buen comienzo!';
		if (value >= 25 && value < 75) return 'Sigue así';
		if (value >= 75 && value < 100) return 'Falta poco';
		if (value >= 100) return '🎉';
		else return 'Progreso';
	}
}
